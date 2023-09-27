import Button from "@/components/button";
import Layout from "@/components/layout";
import type { NextPage } from "next";

const Write: NextPage = () => {
  return (
    <Layout canGoBack title="동네생활 글쓰기">
      <div className="px-4 py-10 space-y-2">
        <div
          className="cursor-pointer flex items-center justify-between px-3 py-3 text-gray-800 border-b border-gray-300
        "
        >
          <span>동네질문</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M8.25 4.5l7.5 7.5-7.5 7.5"
            />
          </svg>
        </div>
        <div className="p-4 bg-gray-200 rounded-xl">
          <span className="text-xs font-bold mr-2">안내</span>
          <span className="text-xs">
            중고거래 관련, 명예훼손, 광고/홍보 목적의 글은 올리실 수 없어요.
          </span>
        </div>
        <form className="space-y-2">
          <input
            type="text"
            placeholder="제목을 입력하세요"
            required
            className="text-gray-800 font-bold text-lg placeholder:text-gray-500 placeholder:font-bold placeholder:text-lg  appearance-none w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-400 focus:border-orange-400
                "
          />
          <textarea
            id="community_question_write"
            rows={5}
            placeholder="가까이 사는 동네 이웃들에게 궁금한 것을 물어보세요! 근처 이웃이 친절하게 진짜 동네 정보를 알려줄거예요"
            className="text-gray-800 shadow-sm w-full border-gray-300 focus:outline-none focus:ring-orange-400 focus:border-orange-400 rounded-md "
          />
          <Button text="완료" />
        </form>
      </div>
    </Layout>
  );
};

export default Write;
