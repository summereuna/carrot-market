import Button from "@/components/button";
import Layout from "@/components/layout";
import Textarea from "@/components/textarea";
import User from "@/components/user-box";
import Comment from "@/components/comment";

import type { NextPage } from "next";

const CommunityPostDetail: NextPage = () => {
  return (
    <Layout canGoBack>
      <div>
        <span
          className="inline-flex my-3 ml-4 items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800
        "
        >
          동네질문
        </span>
        {/*user-profile"*/}
        <div className="px-4 mb-3 py-3 border-b">
          <User name="짱구야놀자" size="small" time="2시간 전" />
        </div>
        <div>
          <div className="mt-2 px-4 text-gray-700 flex flex-col space-y-2">
            <div className="text-xl font-semibold">
              <span className="text-orange-500">Q. </span>
              <span>김밥 맛있는 곳 추천해주세요!</span>
            </div>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aliquam
              corporis, quas maiores totam culpa fuga sapiente obcaecati
              consectetur repellat sequi vero minima et quae dicta? Consectetur,
              vel consequatur. Eligendi, cum.
            </p>
          </div>
          <div className="flex px-4 space-x-5 mt-3 text-gray-700 py-2.5 border-t border-b-[2px] w-full">
            <span className="flex space-x-2 items-center text-sm">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
              <span>궁금해요 1</span>
            </span>
            <span className="flex space-x-2 items-center text-sm">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                ></path>
              </svg>
              <span>답변 1</span>
            </span>
          </div>
        </div>
        {/*댓글*/}
        <div className="px-4 my-5 space-y-5">
          {[1, 1, 1].map((_, i) => (
            <Comment
              key={i}
              name="참치맛오이"
              time="2시간 전"
              comment="저는 바르다 김선생 김밥 추천합니다. 저는 바르다 김선생 김밥 추천합니다. 저는 바르다 김선생 김밥 추천합니다."
            />
          ))}
        </div>
        <div className="px-4 space-y-2">
          <Textarea name="reply" placeholder="댓글을 달아주세요." />
          <Button text="댓글달기" />
        </div>
      </div>
    </Layout>
  );
};

export default CommunityPostDetail;
