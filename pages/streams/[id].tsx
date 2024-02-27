import Layout from "@/components/Layout";
import Message from "@/components/Message";
import useUser from "@/libs/client/useUser";
import useMutation from "@/libs/client/useMutation";
import { Message as MessageModel, Stream } from "@prisma/client";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import useSWR from "swr";
import Seo from "@/components/Seo";

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

  const useSWRConfigurationOption = {
    //useSWR이 서버에서 얼마나 자주 새로고침 될지 명시
    refreshInterval: 1000, //1초
  };

  const { data, mutate: boundMutate } = useSWR<StreamResponse>(
    router.query.id ? `/api/streams/${router.query.id}` : null,
    useSWRConfigurationOption
  );
  //console.log(data);
  const [sendMessage, { data: sendMessageData, loading }] = useMutation(
    `/api/streams/${router.query.id}/messages`
  );

  const { register, handleSubmit, reset } = useForm<MessageForm>();
  const onValid = (validMessageForm: MessageForm) => {
    if (loading) return;
    reset();

    //사용자에게 리얼타임 같은 경험 제공 위해
    //데이터 페치 대신 swr 캐시를 mutate 해서 사용자에게 바로 보여주기
    boundMutate(
      (prev) =>
        prev &&
        ({
          ...prev,
          stream: {
            ...prev.stream,
            messages: [
              ...prev.stream.messages,
              {
                id: Date.now(),
                message: validMessageForm.message,
                created: Date.now(),
                user: { ...user },
              },
            ],
          },
        } as any),
      false
    );

    //찐 데이터 백엔드로 요청 보내기
    sendMessage(validMessageForm);
  };

  //채팅창 스크롤 맨 밑 유지
  const scrollRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    scrollRef?.current?.scrollIntoView();
  });

  // useEffect(() => {
  //   //메시지 보내고 나면
  //   // /api/streams/${router.query.id} 페치
  //   if (sendMessageData && sendMessageData.ok) {
  //     //데이터 페치
  //     boundMutate(sendMessageData);
  //   }
  // }, [sendMessageData, boundMutate]);

  return (
    <Layout canGoBack>
      {data?.ok ? (
        <>
          <Seo
            title={`${data?.stream?.name} | 라이브 스트리밍`}
            description={`당근마켓 라이브 스트리밍 | ${data?.stream?.description}`}
          />
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
                  ? data?.stream?.price.toLocaleString()
                  : null}
              </span>
              <p className=" my-6 text-gray-700">{data?.stream?.description}</p>
            </div>

            {/* 채팅창: 보이는 화면 50에 고정*/}
            <h2 className="text-2xl font-semibold text-gray-900">
              라이브 채팅
            </h2>
            <div className="py-4 pb-4 h-[50vh] overflow-y-scroll px-4 space-y-3">
              {data?.stream?.messages.map((message) => (
                <Message
                  key={message.id}
                  message={message.message}
                  time={message.created.toString()}
                  me={message.user.id === user?.id ? true : false}
                  avatarUrl={
                    message.user.id !== user?.id
                      ? message.user.avatar
                      : undefined
                  }
                  isReservedAlarm={false}
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
        </>
      ) : (
        <span>Not found 404</span>
      )}
    </Layout>
  );
};

export default LiveDetail;

/*
NextJS의 Serverless 환경,
즉 NextJS와 api router만 사용해서는 실시간(real time)을 만들 수 없다.

실제 WebSocket을 사용할 수 없는 이유는 서버가 없기 때문이다 ^^..
실시간을 만들기 위해서는 서버가 필요하고, 그 서버가 클라이언트와 연결을 계속 유지해야 한다.

따라서 NextJS 앱을 Serverless 환경에서 배포한다면, 
api에 있는 함수들은 Serverless 환경에서 실행된다.
이 함수들이 실행된 후에는 서버와 연결이 끊긴다.

따라서 NextJS, pages, api router 만으로는 실시간을 만들 수 없다.
위 처럼 가짜로 흉내를 낼 수는 있다.

실시간 하는 것은 추후에... 서버를 연결하면 하자구... 
실시간 + 서버리스를 구현하기 위해 Cloudflare과 Durable Objects를 사용...
*/
