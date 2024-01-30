import Layout from "@/components/layout";
import Reviews from "@/components/reviews";
import SmButton from "@/components/smButton";
import UserBox from "@/components/user-box";
import useUser from "@/libs/client/useUser";
import { Review, User } from "@prisma/client";
import type { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import useSWR from "swr";

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
  console.log(data);

  const handlerProfileClick = () => {
    router.push(`/profile/${user?.id}`);
  };

  return (
    user && (
      <Layout title="나의 당근" hasTabBar>
        <div className="divide-y-[1px]">
          {/* 유저 정보 */}
          <div className="px-4 py-4 flex justify-between items-center">
            <UserBox name={user.name} avatar={user.avatar} size="large" />
            {/* <Link href={`/profile/${user?.id}`}>
            <button className="cursor-pointer py-2 px-3 rounded-md text-sm font-semibold text-gray-700 bg-gray-100">
              프로필 보기
            </button>
          </Link> */}
            <SmButton
              onClick={handlerProfileClick}
              loading={null}
              text={"프로필 보기"}
            />
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
            <h2 className="px-4 font-semibold mb-2 py-3">받은 매너 평가</h2>
            {/* 유저 평가 */}
            <Reviews reviews={data?.reviews} />
          </div>
        </div>
      </Layout>
    )
  );
};

export default Profile;
