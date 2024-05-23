import ChatProductInfo from "@/components/ChatProductInfo";
import FloatingInput from "@/components/FloatingInput";
import Layout from "@/components/Layout";
import Message from "@/components/Message";
import Seo from "@/components/Seo";
import useMutation from "@/libs/client/useMutation";
import useUser from "@/libs/client/useUser";
import { divideDate } from "@/libs/client/utils";
import { Chat, ChatRoom, Product, Reservation } from "@prisma/client";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import useSWR from "swr";

interface ReservationInfo extends Reservation {
  user: { name: string };
}

interface productWthProductOwner extends Product {
  reservation: ReservationInfo;
  user: { name: string };
  review?: { id: number; createdById: number; length: number }[];
}

export interface chatMessage extends Chat {
  user: { avatar?: string; id: number };
}
export interface chatRoomWithChatMessage extends ChatRoom {
  chats: chatMessage[];
  product: productWthProductOwner;
  user: { name: string };
}

interface ChatRoomResponse {
  ok: boolean;
  chats: chatRoomWithChatMessage;
}
interface ChatForm {
  chat: string;
}

// interface CreateReservationResponse {
//   ok: boolean;
//   chatRoom: ChatRoom;
// }

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

  const [sendChat, { data: sendChatData, loading }] = useMutation<ChatForm>(
    `/api/chats/${router.query.id}/chats`
  );

  const { register, handleSubmit, reset } = useForm<ChatForm>();
  const onValid = (chat: ChatForm) => {
    // console.log(chat);
    if (loading) return;
    reset();

    //사용자에게 리얼타임 같은 경험 제공 위해, 데이터 패치 대신 캐시 mutate해서 사용자에게 바로 보여주기
    //boundMutate();

    sendChat(chat);
  };

  const handleReservationToggleClick = () => {
    router.push(`/products/${data?.chats?.product?.id}/reservation`);
  };

  const handleWriteReviewClick = () => {
    router.push(`/products/${data?.chats?.product?.id}/review`);
  };
  //채팅창 스크롤 맨 밑 유지
  const scrollRef = useRef<HTMLDivElement>(null);

  // const [
  //   removeChatRoom,
  //   { data: removeChatRoomData, loading: removeChatRoomLoading },
  // ] = useMutation<ChatForm>(`/api/chats`);

  // const onLeaveChatRoom = () => {
  //   if (removeChatRoomLoading) return;
  //   const confirmRemoveChatRoom = confirm("정말 채팅방을 나가겠습니까?");
  //   if (confirmRemoveChatRoom && data?.chats?.product?.review?.id) {
  //     removeChatRoom({});
  //   }
  // };

  // useEffect(() => {
  //   if (removeChatRoomData) {
  //     router.push(`/chats`);
  //   }
  // });

  useEffect(() => {
    scrollRef?.current?.scrollIntoView();
  });

  return (
    <Layout
      canGoBack
      title={
        user?.id === data?.chats?.product?.userId
          ? data?.chats?.user?.name
          : data?.chats?.product?.user?.name
      }
    >
      <Seo title="채팅 | 네이버후드" description="네이버후드 채팅" />
      <div className="border-b-[1px] pb-3">
        <ChatProductInfo
          key={data?.chats?.product?.id}
          productName={data?.chats?.product?.name!}
          productImage={data?.chats?.product?.image!}
          price={data?.chats?.product?.price!}
          id={data?.chats?.product?.id!}
          isOnSale={data?.chats?.product?.reservation ? false : true}
          isSoldOut={
            data?.chats?.product?.reservation &&
            (data?.chats?.product?.review?.length as number) > 0
              ? true
              : false
          }
          isReviewedByMe={Boolean(
            data?.chats?.product?.review
              ?.map((item) => item.createdById)
              .includes(user?.id as number)
          )}
          onReservation={handleReservationToggleClick}
          writeReview={handleWriteReviewClick}
        />
      </div>
      <div className="px-4 py-3 space-y-3 mb-12">
        {(data?.chats?.chats?.length as number) > 0 &&
          Object.entries(divideDate(data?.chats?.chats!)).map(
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
                      isReservedAlarm={chat.isReservedAlarm}
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
            <p>[거래꿀팁] 네이버후드 채팅이 가장 편하고 안전해요. 🍀</p>
            <p>카카오톡ID 등으로 대화를 유도하는 경우,</p>
            <p>피해가 있을 수 있으니 주의하세요!</p>
          </div>
        )}
        {(data?.chats?.product?.review?.length as number) > 0 && (
          <div className="space-y-2 py-4 flex flex-col items-center text-sm text-gray-400">
            <div className="flex flex-col items-center">
              <p>거래를 완료했어요!</p>
              <p>
                {user?.id === data?.chats?.product?.userId
                  ? data?.chats?.user?.name
                  : data?.chats?.product?.user?.name}
                님과의 채팅을 종료하겠습니까?
              </p>
            </div>

            {/* <button
              onClick={onLeaveChatRoom}
              className="w-24 underline cursor-pointer hover:text-lime-600 focus:text-lime-600"
            >
              {removeChatRoomLoading ? "로딩 중..." : "채팅방 나가기"}
            </button> */}
            <div className="flex flex-col items-center text-sm">
              <p>
                <i>나가기</i>를 하면 대화내용이 모두 삭제되고
              </p>
              <p>채팅목록에서도 삭제됩니다.</p>
            </div>
          </div>
        )}
        <div ref={scrollRef} />
        {/*플로팅 채팅창 고정*/}
        <div className="bg-gray-100 fixed bottom-0 p-2 inset-x-0 z-20">
          <form
            onSubmit={handleSubmit(onValid)}
            className="relative flex max-w-md items-center w-full mx-auto"
          >
            <FloatingInput
              register={register("chat", {
                required: true,
              })}
              name="chat"
              placeholder="메세지를 입력하세요."
              required
              isLoading={loading}
            />
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default ChatDetail;
