import Layout from "@/components/Layout";
import Reviews from "@/components/Reviews";
import Seo from "@/components/Seo";
import SmButton from "@/components/SmButton";
import UserBox from "@/components/UserBox";
import useUser from "@/libs/client/useUser";
import { Review, User } from "@prisma/client";
import type { GetServerSideProps, NextPage, NextPageContext } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import useSWR, { SWRConfig } from "swr";
import { withSsrSession } from "@/libs/server/withSession";
import client from "@/libs/server/client";
import useMutation from "@/libs/client/useMutation";
import { useEffect } from "react";

interface ReviewWithUser extends Review {
  createdBy: User;
}

interface ReviewsResponse {
  ok: boolean;
  reviews?: ReviewWithUser[];
}

const Profile: NextPage = () => {
  const { user } = useUser();
  const { data } = useSWR<ReviewsResponse>("/api/reviews");
  const router = useRouter();

  const handleProfileClick = () => {
    router.push(`/profile/${user?.id}`);
  };

  const [logout, { loading, data: isLogout }] =
    useMutation(`/api/users/logout`);

  const handleLogout = () => {
    // if (loading) return;
    logout({});
  };

  useEffect(() => {
    if (isLogout?.ok) {
      router.push("/login");
    }
  }, [router, isLogout]);
  //아니 백엔드에서 발 못보내냐고 ㅇㅇ...??

  return (
    user && (
      <Layout title="나의 후드" hasTabBar>
        <Seo
          title="나의 후드 | 네이버후드"
          description="네이버후드 나의 후드"
        />
        <div className="divide-y-[1px]">
          {/* 유저 정보 */}
          <div className="px-4 py-4 flex justify-between items-center">
            <UserBox name={user.name} avatar={user.avatar} size="large" />
            {/* <Link href={`/profile/${user?.id}`}>
            <button className="cursor-pointer py-2 px-3 rounded-md text-sm font-semibold text-gray-700 bg-gray-100">
              프로필 보기
            </button>
          </Link> */}
            <div className="flex space-x-2">
              <SmButton
                onClick={handleProfileClick}
                loading={null}
                text={"프로필 보기"}
              />
              <SmButton
                onClick={handleLogout}
                loading={null}
                text={"로그아웃"}
                bgGray
              />
            </div>
          </div>
          {/*유저 활동 세부 정보 */}
          <div className="py-2">
            <h2 className="px-4 font-semibold py-3">나의 거래</h2>

            <div className="flex flex-col">
              <Link href="/profile/loved">
                <div className="hover:bg-slate-100 focus:bg-slate-100 transition-colors">
                  <div className="px-4 py-3 flex items-center cursor-pointer">
                    <div className="flex items-center justify-center">
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                        ></path>
                      </svg>
                    </div>
                    <span className="ml-2 text-sm font-medium text-gray-700">
                      관심목록
                    </span>
                  </div>
                </div>
              </Link>
              <Link href="/profile/sold">
                <div className="hover:bg-slate-100 focus:bg-slate-100 transition-colors">
                  <div className="px-4 py-3 flex items-center cursor-pointer">
                    <div className="flex items-center justify-center">
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                        ></path>
                      </svg>
                    </div>
                    <span className="ml-2 text-sm font-medium text-gray-700">
                      판매내역
                    </span>
                  </div>
                </div>
              </Link>
              <Link href="/profile/bought">
                <div className="hover:bg-slate-100 focus:bg-slate-100 transition-colors">
                  <div className="px-4 py-3 flex items-center cursor-pointer">
                    <div className="flex items-center justify-center">
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                        ></path>
                      </svg>
                    </div>
                    <span className="ml-2 text-sm font-medium text-gray-700">
                      구매내역
                    </span>
                  </div>
                </div>
              </Link>
            </div>
          </div>

          <div className="mt-3 py-4">
            <h2 className="px-4 font-semibold mb-2 py-3">받은 거래 후기</h2>
            {/* 유저 평가 */}
            <Reviews reviews={data?.reviews} />
          </div>
        </div>
      </Layout>
    )
  );
};

const Page: NextPage<{
  profile: User;
  // reviews: ReviewWithUser[]
}> = ({
  profile,
  // reviews
}) => {
  return (
    <SWRConfig
      value={{
        fallback: {
          "/api/users/me": { ok: true, profile },
          // "/api/reviews": {
          //   ok: true,
          //   reviews,
          // },
        },
      }}
    >
      <Profile />
    </SWRConfig>
  );
};

//함수를 다른 함수의 인자로 전달! > 함수형 프로그래밍
//getServerSideProps 함수 내용에 해당하는 부분을 withSsrSession() 함수로 감싸고 getServerSideProps 변수에 명명한다.
//NextJS가 찾는 건 getServerSideProps 함수니까 그렇게 해도 된다.
//이렇게 getServerSideProps의 함수 내용에 해당하는 handler를 withSsrSession() 함수의 인자로 보내면,
// context.req.session.id 얻을 수 있음
export const getServerSideProps: GetServerSideProps = withSsrSession(
  async function ({ req }: NextPageContext) {
    //요렇게
    // console.log(context.req?.session.user);

    //req.session.user에 있는 id 사용하여 유저 데이터 찾아오기
    const profile = await client.user.findUnique({
      where: { id: req?.session.user?.id },
    });
    // const reviews = await client.review.findMany({
    //   where: { createdForId: req?.session.user?.id },
    //   include: {
    //     createdBy: { select: { id: true, name: true, avatar: true } },
    //   },
    //   orderBy: { created: "desc" },
    // });
    return {
      props: {
        profile: JSON.parse(JSON.stringify(profile)),
        // reviews: JSON.parse(JSON.stringify(reviews)),
      },
    };
  }
);

export default Page;

//상품 정보같은 데서는 인증해 줄게 없기 때문에 getServerSideProps 안에서 인증 요청은 없지만
//프로필 페이지는 getServerSideProps 함수 안에서 인증 요청보내서 로그인된 유저가 누구인지 미리 알면 편하다.
//그래서 유저의 프로필을 server side에서 렌더링 한 것임

//useSWR 사용해서 fallback 안에 컴포넌트의 캐시 초기값도 제공하고 있다.
//useUser훅이 백그라운드에서 실행되기 때문에 사용자가 프로필 페이지에 접속 시 로딩 상태 없이 바로 렌더링된 페이즈를 볼 수 있다.
