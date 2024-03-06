import FloatingButton from "@/components/FloatingButton";
import Layout from "@/components/Layout";
import Seo from "@/components/Seo";
import useCoords from "@/libs/client/useCoords";
import { getTimeInterval } from "@/libs/client/utils";
import { User, Post } from "@prisma/client";
import type { GetStaticProps, NextPage } from "next";
import Link from "next/link";
import useSWR from "swr";
import client from "@/libs/server/client";

interface PostWithRecsAndAnswers extends Post {
  user: User;
  _count: { recommendations: number; answers: number };
}

interface PostResponse {
  ok: boolean;
  posts: PostWithRecsAndAnswers[];
}

const Community: NextPage<{ posts: PostWithRecsAndAnswers[] }> = ({
  posts,
}) => {
  //✅리액트 부분 주석처리
  // //유저의 위치와 가까운 곳에 있는 포스트만 보기
  // //위 api에 위도경도 담아보내야함
  // const { latitude, longitude } = useCoords();

  // const { data } = useSWR<PostResponse>(
  //   latitude && longitude
  //     ? `/api/posts?latitude=${latitude}&longitude=${longitude}`
  //     : null
  // );
  // //console.log(data?.posts);
  // console.log(latitude, longitude);

  return (
    <Layout title="동네생활" hasTabBar>
      <Seo title="동네생활 | 당근마켓" description="당근마켓 동네생활" />
      <div className="divide-y">
        {posts?.map((post) => (
          <div key={post.id}>
            <Link href={`/community/${post.id}`}>
              <div className="cursor-pointer flex flex-col items-start space-y-2 py-4">
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
                <div className="px-4 flex justify-between w-full text-gray-500 font-medium text-xs">
                  <div className="flex items-center space-x-1 w-full ">
                    <span>{post.user.name}</span>
                    <span>&#183;</span>
                    <span>{getTimeInterval(post.created)}</span>
                  </div>
                  {/*icons*/}
                  <div className="flex space-x-2">
                    <div className="flex space-x-1 items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-4 h-4"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z"
                        />
                      </svg>
                      <span>{post._count.recommendations}</span>
                    </div>
                    <div className="flex space-x-1 items-center text-sm">
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
                      <span>{post._count.answers}</span>
                    </div>
                  </div>
                  {/*icons*/}
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

export const getStaticProps: GetStaticProps = async () => {
  console.log("커뮤니티 페이지 정적으로 생성 중...");
  //포스트 db가져오기: 실제 프로덕션에서는 페이지네이션 하는게 좋음
  const posts = await client.post.findMany({
    //다 가져오기
    //거기에 추천, 답변 카운트도 포함해서
    include: {
      _count: {
        select: { recommendations: true, answers: true },
      },
      user: { select: { name: true, id: true, avatar: true } },
    },
    orderBy: { created: "desc" },
  });
  return {
    props: { posts: JSON.parse(JSON.stringify(posts)) },
    revalidate: 10, //페이지로 사용자 진입 후 10초가 지나면 해당 페이지 정적생성진행
    //이때 정적생성으로 업데이트 된 페이지가 다음 사용자에게 제공됨
    //10초마다 생성되는게 아님 ㅇㅇ!
  };
};

export default Community;
