import Layout from "@/components/layout";
import CheckBoxReview from "@/components/checkBoxReview";
import UserBox from "@/components/user-box";
import useUser from "@/libs/client/useUser";
import { cls } from "@/libs/client/utils";
import { Review, User } from "@prisma/client";
import type { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import useSWR from "swr";
import { count } from "console";

interface ReviewWithUser extends Review {
  createdBy: User;
}

interface receivedReviewsWithUser extends User {
  receivedReviews: Review[];
}

interface UserResponse {
  ok: boolean;
  profile: receivedReviewsWithUser;
  reviews: ReviewWithUser[];
}

const UserProfile: NextPage = () => {
  const { user } = useUser();
  const router = useRouter();

  const { data } = useSWR<UserResponse>(
    router.query.id ? `/api/users/${router.query?.id}` : null
  );

  function convertReviews(reviewsArrayData: ReviewWithUser[]) {
    //받은 리뷰 하나의 배열로 변환해 넣기
    const reviewsArray = reviewsArrayData.map(
      (review) => review.reviewCheckBoxes
    );

    //문자열을 배열로 변환해 합치기
    const flatReviewsArray = reviewsArray?.flatMap((review) =>
      JSON.parse(review)
    );

    //각 요소 개수 세기
    const countReviews = flatReviewsArray?.reduce((acc, value) => {
      acc[value] = (acc[value] || 0) + 1;
      return acc;
    }, {});

    return Object.entries(countReviews);
  }

  return (
    <Layout canGoBack title="프로필" hasTabBar>
      <div className="divide-y-[1px]">
        {/* 유저 정보 */}
        <div className="px-4 py-4">
          <Link href="/profile/edit">
            <UserBox
              name={data?.profile?.name}
              avatar={data?.profile?.avatar}
              size="large"
              isMe={router.query.id === user?.id ? true : false}
            />
          </Link>
        </div>
        {/*유저 활동 세부 정보 */}
        <div className="py-2">
          <div className="flex justify-between px-4 py-3 mb-2">
            <h2 className="font-semibold">받은 매너 평가</h2>
            <button>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m8.25 4.5 7.5 7.5-7.5 7.5"
                />
              </svg>
            </button>
          </div>
          {data?.reviews &&
            convertReviews(data?.reviews).map(([key, value]) => (
              <div key={key}>
                <CheckBoxReview count={value as number} review={key} />
              </div>
            ))}
          {data?.reviews?.length === 0 && (
            <div className="px-4 py-3 flex items-start">
              <span className="text-sm font-medium text-gray-700">
                받은 매너 평가가 없습니다.
              </span>
            </div>
          )}
        </div>

        <div className="mt-3 py-4">
          <div className="flex justify-between px-4 py-3 mb-2">
            <h2 className="font-semibold">받은 거래 후기</h2>
            <button>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m8.25 4.5 7.5 7.5-7.5 7.5"
                />
              </svg>
            </button>
          </div>
          {/* 유저 평가 */}
          {data?.reviews.map((review) => (
            <div key={review.id} className="py-3 px-4">
              <div className="flex items-center space-x-4">
                {review.createdBy.avatar ? (
                  <Image
                    src={review.createdBy.avatar}
                    alt="avatar-preview"
                    width={40}
                    height={40}
                    className="w-10 h-10 rounded-full bg-slate-300 object-cover"
                  />
                ) : (
                  <div className="w-10 h-10 bg-slate-300 rounded-full" />
                )}
                <div>
                  <h4 className="text-sm font-bold text-gray-800">
                    {review.createdBy.name}
                  </h4>
                  {/*리뷰 별 갯수*/}
                  <div className="flex items-center">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg
                        key={star}
                        className={cls(
                          "h-5 w-5",
                          review.score >= star
                            ? "text-yellow-400"
                            : "text-gray-400"
                        )}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
              </div>
              <div className="mt-3 text-gray-600 text-sm">
                <p>{review.review}</p>
              </div>
            </div>
          ))}
          {data?.reviews?.length === 0 && (
            <div className="px-4 py-3 flex items-start">
              <span className="text-sm font-medium text-gray-700">
                받은 거래 후기가 없습니다.
              </span>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default UserProfile;
