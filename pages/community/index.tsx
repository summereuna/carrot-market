import FloatingButton from "@/components/floating-button";
import Layout from "@/components/layout";
import { User, Post } from "@prisma/client";
import type { NextPage } from "next";
import Link from "next/link";
import useSWR from "swr";

interface PostWithRecsAndAnswers extends Post {
  user: User;
  _count: { recommendations: number; answers: number };
}

interface PostResponse {
  ok: boolean;
  posts: PostWithRecsAndAnswers[];
}

const Community: NextPage = () => {
  const { data } = useSWR<PostResponse>("/api/posts");
  console.log(data?.posts);
  return (
    <Layout title="동네생활" hasTabBar>
      <div className="py-5 space-y-8">
        {data?.posts?.map((post) => (
          <div key={post.id}>
            <Link href={`/community/${post.id}`}>
              <div className="cursor-pointer flex flex-col items-start">
                <span
                  className="flex ml-4 items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800
        "
                >
                  동네질문
                </span>
                <div className="mt-2 px-4 text-gray-700">
                  <span className="text-orange-500 font-medium">Q.</span>{" "}
                  {post.title}
                </div>
                <div className="mt-5 px-4 flex items-center justify-between w-full text-gray-500 font-medium text-xs">
                  <span>{post.user.name}</span>
                  <span>{post.created.toString()}</span>
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
                    <span>추천 {post._count.recommendations}</span>
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
                    <span>답변 {post._count.answers}</span>
                  </span>
                </div>
              </div>
            </Link>
          </div>
        ))}

        <FloatingButton href="/community/write" text="글쓰기" />
      </div>
    </Layout>
  );
};

export default Community;
