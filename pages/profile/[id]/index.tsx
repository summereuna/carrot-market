import Layout from "@/components/Layout";
import CheckBoxReview from "@/components/CheckBoxReview";
import UserBox from "@/components/UserBox";
import useUser from "@/libs/client/useUser";
import { User } from "@prisma/client";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import useSWR from "swr";
import Reviews, { ReviewWithUser } from "@/components/Reviews";
import DetailPageTitle from "@/components/DetailPageTitle";
import SmButton from "@/components/SmButton";
import Manner from "@/components/Manner";
import Seo from "@/components/Seo";

export interface UserResponse {
  ok: boolean;
  profile: User;
  reviews?: ReviewWithUser[];
}

const UserProfile: NextPage = () => {
  const { user, isLoading } = useUser();
  const router = useRouter();

  const handlerProfileEdit = () => {
    router.push(`/profile/edit`);
  };

  const { data } = useSWR<UserResponse>(
    router.query.id ? `/api/users/${router.query.id}` : null
  );

  // console.log(typeof router.query.id);
  // console.log(typeof user?.id);

  const getMannerDegree = (initialDegree: number, reviewsScore: number[]) => {
    for (let i = 0; i < reviewsScore.length; i++) {
      switch (reviewsScore[i]) {
        case 1:
          initialDegree += -0.5;
          break;
        case 2:
          initialDegree += -0.25;
          break;
        case 3:
          initialDegree += 0.25;
          break;
        case 4:
          initialDegree += 0.5;
          break;
        case 5:
          initialDegree += 0.75;
          break;
        default:
          break;
      }
    }
    return initialDegree;
  };

  return (
    <Layout canGoBack title="프로필">
      <Seo
        title={`${data?.profile?.name}님의 프로필 | 네이버후드`}
        description="네이버후드 유저 프로필"
      />
      {data?.profile && (
        <div className="divide-y-[1px]">
          {/* 유저 정보 */}
          <div className="px-4 py-4">
            {+router.query.id! === user?.id ? (
              <div className="px-4 py-4 flex flex-col space-y-4">
                <UserBox
                  name={data?.profile?.name}
                  avatar={data?.profile?.avatar}
                  size="large"
                />
                <SmButton
                  onClick={handlerProfileEdit}
                  text={"프로필 수정"}
                  bgGray={true}
                />
              </div>
            ) : (
              <UserBox
                name={data?.profile?.name}
                avatar={data?.profile?.avatar}
                size="large"
              />
            )}
          </div>
          {/*유저 매너 온도*/}
          <div className="py-2">
            <div className="flex flex-col px-4 py-3 space-y-5">
              <h2 className="font-semibold">매너 온도</h2>
              <Manner
                degree={
                  data?.reviews?.length === undefined ||
                  data?.reviews?.length < 1
                    ? 36.5
                    : getMannerDegree(
                        36.5,
                        data?.reviews?.map((review) => review.score)
                      )
                }
              />
            </div>
          </div>
          {/*유저 활동 세부 정보 */}
          <div className="py-2">
            <DetailPageTitle
              title={"판매상품"}
              url={`/profile/${router.query?.id}/sales`}
            />
          </div>
          <div className="py-2">
            <DetailPageTitle
              title={"받은 매너 평가"}
              url={`/profile/${router.query?.id}/manner`}
            />
            <CheckBoxReview reviews={data?.reviews} />
          </div>
          <div className="py-2 mt-3">
            <DetailPageTitle
              title={"받은 거래 후기"}
              url={`/profile/${router.query?.id}/reviews`}
            />
            <Reviews reviews={data?.reviews} />
          </div>
        </div>
      )}

      {!isLoading && !data?.ok && (
        <div className="flex justify-center mt-20">
          존재하지 않는 사용자 입니다.
        </div>
      )}
    </Layout>
  );
};

export default UserProfile;
