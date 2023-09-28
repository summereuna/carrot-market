import Layout from "@/components/layout";
import Message from "@/components/message";
import type { NextPage } from "next";

const ChatDetail: NextPage = () => {
  return (
    <Layout canGoBack title="유저 이름">
      <div className="px-4 py-3 space-y-3">
        <Message
          message="올리신 글 보고 연락드려요. 혹시 에누리로 2만원에 구매
                가능한가요?"
          time="오후 12:45"
          me={false}
        />
        <Message
          message="안녕하세요 가능합니다~ 언제 가능하신가요?"
          time="오후 12:45"
          me={true}
        />
        <Message
          message="오후 7시 이후 역 앞에서 가능하신가요?"
          time="오후 12:50"
          me={false}
        />
        {/*플로팅 채팅창 고정*/}
        <div className="bg-white fixed bottom-0 p-2 inset-x-0">
          <div className="relative flex max-w-md items-center w-full mx-auto">
            <input
              type="text"
              className="pr-12 shadow-sm rounded-full w-full border-gray-300 focus:outline-none focus:border-orange-500 focus:ring-orange-500"
            />
            <div className="absolute inset-y-0 flex py-1.5 pr-1.5 right-0">
              <button className="flex items-center bg-orange-500 rounded-full px-3 hover:bg-orange-600 focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 text-sm text-white">
                &rarr;
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ChatDetail;
