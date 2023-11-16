import Layout from "@/components/layout";
import Message from "@/components/message";
import useUser from "@/libs/client/useUser";
import useMutation from "@/libs/server/useMutation";
import { threeDigitDivision } from "@/libs/server/utils";
import { Message as MessageModel, Stream } from "@prisma/client";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import useSWR from "swr";

interface StreamMessage {
  id: number;
  message: string;
  created: Date;
  user: { avatar?: string; id: number };
}

interface StreamWithMessages extends Stream {
  messages: StreamMessage[];
}

interface StreamResponse {
  ok: boolean;
  stream: StreamWithMessages;
}

interface MessageForm {
  message: string;
}

const LiveDetail: NextPage = () => {
  const { user } = useUser();
  const router = useRouter();

  const { data, mutate: boundMutate } = useSWR<StreamResponse>(
    router.query.id ? `/api/streams/${router.query.id}` : null
  );
  //console.log(data);
  const [sendMessage, { data: sendMessageData, loading }] = useMutation(
    `/api/streams/${router.query.id}/messages`
  );

  const { register, handleSubmit, reset } = useForm<MessageForm>();
  const onValid = (validMessageForm: MessageForm) => {
    if (loading) return;
    reset();
    sendMessage(validMessageForm);
  };

  //채팅창 스크롤 맨 밑 유지
  const scrollRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    scrollRef?.current?.scrollIntoView();
  });

  useEffect(() => {
    //메시지 보내고 나면
    // /api/streams/${router.query.id} 페치
    if (sendMessageData && sendMessageData.ok) {
      boundMutate(sendMessageData);
    }
  }, [sendMessageData, boundMutate]);
  return (
    <Layout canGoBack>
      {data?.ok ? (
        <div className="py-10 px-4 space-y-4">
          {/* 라이브 스트리밍 동영상 */}
          <div className="w-full aspect-video rounded-md shadow-sm  bg-slate-300" />
          <div className="mt-5">
            <h1 className="text-gray-900 font-semibold text-3xl">
              {data?.stream?.name}
            </h1>
            <span className="text-2xl block mt-3 text-gray-900">
              ₩
              {data?.stream?.price
                ? threeDigitDivision(data?.stream?.price)
                : null}
            </span>
            <p className=" my-6 text-gray-700">{data?.stream?.description}</p>
          </div>

          {/* 채팅창: 보이는 화면 50에 고정*/}
          <h2 className="text-2xl font-semibold text-gray-900">라이브 채팅</h2>
          <div className="py-4 pb-4 h-[50vh] overflow-y-scroll px-4 space-y-3">
            {data?.stream?.messages.map((message) => (
              <Message
                key={message.id}
                message={message.message}
                time={message.created.toString()}
                me={message.user.id === user?.id ? true : false}
              />
            ))}
            <div ref={scrollRef} />
          </div>
          {/*플로팅 채팅창 고정*/}
          <div className="bg-white fixed bottom-0 p-2 inset-x-0">
            <form
              onSubmit={handleSubmit(onValid)}
              className="relative flex max-w-md items-center w-full mx-auto"
            >
              <input
                {...register("message", { required: true })}
                name="message"
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
      ) : (
        <span>Not found 404</span>
      )}
    </Layout>
  );
};

export default LiveDetail;
