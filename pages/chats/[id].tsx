import ChatProductInfo from "@/components/chatProductInfo";
import Layout from "@/components/layout";
import Message from "@/components/message";
import useMutation from "@/libs/client/useMutation";
import useUser from "@/libs/client/useUser";
import { divideDate } from "@/libs/client/utils";
import { ChatRoom } from "@prisma/client";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import useSWR from "swr";

interface productOwner {
  name: string;
}
interface Reservation {
  date: Date;
  id: number;
  userId: number;
}

interface productWthProductOwner {
  name: string;
  image: string;
  price: number;
  id: number;
  reservation: Reservation;
  user: productOwner;
}

export interface chatMessage {
  id: number;
  chat: string;
  created: string; //Date;
  user: { avatar?: string; id: number };
}
export interface chatRoomWithChatMessage extends ChatRoom {
  chats: chatMessage[];
  product: productWthProductOwner;
}

interface ChatRoomResponse {
  ok: boolean;
  chats: chatRoomWithChatMessage;
}
interface ChatForm {
  chat: string;
}

interface CreateReservationResponse {
  ok: boolean;
  chatRoom: ChatRoom;
}

const ChatDetail: NextPage = () => {
  const { user } = useUser();
  const router = useRouter();
  const useSWRConfigurationOption = {
    //useSWR이 서버에서 얼마나 자주 새로고침 될지 명시
    refreshInterval: 1000, //1초
  };

  const { data, mutate: boundMutate } = useSWR<ChatRoomResponse>(
    router.query.id ? `/api/chats/${router.query.id}` : null,
    useSWRConfigurationOption
  );

  const [sendChat, { data: sendChatData, loading }] = useMutation(
    `/api/chats/${router.query.id}/chats`
  );

  const { register, handleSubmit, reset } = useForm<ChatForm>();
  const onValid = (validChatForm: ChatForm) => {
    // console.log(validChatForm);
    if (loading) return;
    reset();

    //사용자에게 리얼타임 같은 경험 제공 위해, 데이터 패치 대신 캐시 mutate해서 사용자에게 바로 보여주기
    //boundMutate();

    sendChat(validChatForm);
  };

  const handleReservationToggleClick = () => {
    router.push(`/products/${data?.chats?.product?.id}/reservation`);
  };

  const handleWriteReviewClick = () => {
    router.push(`/products/${data?.chats?.product?.id}/review`);
  };

  //채팅창 스크롤 맨 밑 유지
  const scrollRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    scrollRef?.current?.scrollIntoView();
  });

  return (
    <Layout canGoBack title={data?.chats?.product?.user?.name}>
      <div className="border-b-[1px] pb-3">
        <ChatProductInfo
          key={data?.chats?.product?.id}
          productName={data?.chats?.product?.name}
          productImage={data?.chats?.product?.image}
          price={data?.chats?.product?.price}
          id={data?.chats?.product?.id}
          isSoldOut={data?.chats?.product?.reservation ? true : false}
          onReservation={handleReservationToggleClick}
          writeReview={handleWriteReviewClick}
        />
      </div>
      <div className="px-4 py-3 space-y-3 mb-12">
        {(data?.chats?.chats?.length as number) > 0 &&
          Object.entries(divideDate(data?.chats?.chats)).map(
            ([formattedChatCreateDate, chats]) => (
              <div
                key={formattedChatCreateDate}
                className="flex flex-col space-y-3 text-center"
              >
                <div className="text-center relative">
                  <span className="text-sm text-gray-400 bg-white px-2 inline-block relative z-10">
                    {formattedChatCreateDate}
                  </span>
                  <div className="absolute top-1/2 left-0 right-0 border-b transform -translate-y-1/2"></div>
                </div>
                <div className="space-y-3 flex flex-col">
                  {chats.map((chat) => (
                    <Message
                      key={chat.id}
                      message={chat.chat}
                      time={chat.created}
                      me={chat.user.id === user?.id ? true : false}
                      avatarUrl={
                        chat.user.id !== user?.id ? chat.user.avatar : undefined
                      }
                    />
                  ))}
                </div>
              </div>
            )
          )}

        {/* data?.chats?.chats.map((chat) => (
            <Message 
             key={chat.id}
             message={chat.chat}
             time={chat.created}
             me={chat.user.id === user?.id ? true : false}
             avatarUrl={
               chat.user.id !== user?.id ? chat.user.avatar : undefined
             }
           />
         ))}*/}
        {data?.chats?.chats?.length === 0 && (
          <div className="flex flex-col text-center mt-40 text-sm text-gray-400">
            <p>[거래꿀팁] 당근마켓 채팅이 가장 편하고 안전해요. 🥕</p>
            <p>카카오톡ID 등으로 대화를 유도하는 경우,</p>
            <p>피해가 있을 수 있으니 주의하세요!</p>
          </div>
        )}
        <div ref={scrollRef} />
        {/*플로팅 채팅창 고정*/}
        <div className="bg-gray-100 fixed bottom-0 p-2 inset-x-0">
          <form
            onSubmit={handleSubmit(onValid)}
            className="relative flex max-w-md items-center w-full mx-auto"
          >
            <input
              {...register("chat", { required: true })}
              name="chat"
              type="text"
              placeholder="메시지를 입력하세요."
              required
              className="pr-12 shadow-sm rounded-full w-full border-gray-300 focus:outline-none focus:border-orange-500 focus:ring-orange-500"
            />
            <div className="absolute inset-y-0 flex py-1.5 pr-1.5 right-0">
              <button className="flex items-center bg-orange-500 rounded-full px-3 hover:bg-orange-600 focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 text-sm text-white">
                &rarr;
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default ChatDetail;
