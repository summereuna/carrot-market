import Button from "@/components/button";
import Checkbox from "@/components/checkBox";
import Layout from "@/components/layout";
import Textarea from "@/components/textarea";
import useMutation from "@/libs/client/useMutation";
import { cls } from "@/libs/client/utils";
import { Review } from "@prisma/client";
import type { NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import useSWRImmutable from "swr/immutable";

interface GetReservationProductInfoResponse {
  ok: boolean;
  productReservationInfo: {
    image: string;
    name: string;
    userId: number;
    user: { name: string };
    reservation: { date: string; productId: number; userId: number };
  };
}
interface ReviewForm {
  reviewKind: string;
  reviewWrite: string;
  checkBoxes: string[];
  score: number;
  createdForId: number;
  formErrors?: string;
}

interface ReviewDataMutationResponse {
  ok: boolean;
  data: Review;
}

const Review: NextPage = () => {
  const router = useRouter();

  // const useSWRConfigurationOption = {
  //   //useSWR이 서버에서 얼마나 자주 새로고침 될지 명시
  //   refreshInterval: 1000, //1초
  // };

  const { data: productReservationInfoData, mutate: boundMutate } =
    useSWRImmutable<GetReservationProductInfoResponse>(
      router.query.id ? `/api/products/${router.query.id}/review` : null
      // useSWRConfigurationOption
    );
  console.log(productReservationInfoData);

  const [sendReview, { loading, data: makeReviewData, error }] =
    useMutation<ReviewDataMutationResponse>(
      `/api/products/${router.query?.id}/review`
    );

  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    reset,
    formState: { errors },
  } = useForm<ReviewForm>({
    defaultValues: {
      reviewWrite: "",
      checkBoxes: [],
    },
  });

  const onValidSubmit = async ({ reviewWrite, checkBoxes }: ReviewForm) => {
    //로딩 중이면 멈춤
    if (loading) return;

    //로딩중 아니면 uploadProduct() 실행하여 데이터 받아서 뮤테이션 하기
    if (
      productReservationInfoData &&
      reviewKind &&
      reviewWrite &&
      checkBoxes &&
      checkBoxes.length > 0
    ) {
      const getReviewScore = () => {
        switch (reviewKind) {
          case "best":
            return 5;
          case "good":
            return checkBoxes.length > 3 ? 4 : 3;
          case "bad":
            return checkBoxes.length > 3 ? 1 : 2;
          default:
            3;
            break;
        }
      };
      const sellerId = productReservationInfoData.productReservationInfo.userId;
      //const parsedCheckBoxes = JSON.parse(stringifiedCheckBoxes);
      //나중에 열때 팔즈 해서 열기 > 이건 나중에 페이지 따로 만들어야 함
      sendReview({
        kind: reviewKind,
        review: reviewWrite,
        reviewCheckBoxes: JSON.stringify(checkBoxes),
        score: getReviewScore(),
        createdForId: sellerId,
      });
    } else {
      return setError("formErrors", {
        message: "하나 이상 체크하세요.",
      });
    }
  };

  // const [
  //   cancelReservation,
  //   { loading: cancelLoading, data: cancelData, error: cancelError },
  // ] = useMutation<MakeReviewDataMutationResponse>(
  //   `/api/products/${router.query?.id}/reservation`
  // // );
  // const onCancelReservation = () => {
  //   const confirmCancelReservation = confirm("정말 예약을 취소하시겠습니까?");
  //   if (confirmCancelReservation) {
  //     sendReviews({});
  //   }
  // };

  const [reviewKind, setReviewKind] = useState("good");

  const reviewKindHandler = (e) => {
    e.preventDefault();
    setReviewKind(e.target.id);
  };

  useEffect(() => {
    reset((prevFormValues) => ({
      ...prevFormValues,
      checkBoxes: [],
    }));
  }, [reviewKind, reset]);

  useEffect(() => {
    if (makeReviewData?.ok) {
      console.log(makeReviewData);
      reset();
      router.push(`/products/${router.query.id}/review/send`);
    }
  }, [makeReviewData, router, reset]);

  return (
    <Layout canGoBack title="거래 후기 보내기">
      <div className="flex space-x-4 px-4 py-4 bg-gray-200">
        <Image
          src={productReservationInfoData?.productReservationInfo?.image}
          alt="product-image"
          width={40}
          height={40}
          className="w-16 h-16 bg-slate-300 rounded-md object-fill border-[1px]"
        />
        <div className="pt-2 flex flex-col space-y-1">
          <span className="text-sm font-medium mr-2 text-gray-500">
            거래한 물건
          </span>
          <span className="text-sm text-gray-900">
            {productReservationInfoData?.productReservationInfo?.name}
          </span>
        </div>
      </div>
      <form onSubmit={handleSubmit(onValidSubmit)}>
        <div className="px-4 py-2">
          {/* 체크박스 */}
          <div className="flex flex-col items-center border-b py-7 space-y-5">
            <h3 className="text-lg font-semibold ">
              {productReservationInfoData?.productReservationInfo?.user?.name}님
              과의 거래가 어땠나요?
            </h3>
            <span className="text-sm text-gray-500">
              거래선호도는 상대방이 알 수 없어요.
            </span>
            <div className="flex justify-between w-full px-5 font-semibold">
              <div
                id="bad"
                onClick={reviewKindHandler}
                className={cls(
                  "flex flex-col items-center justify-center w-24 h-24 rounded-3xl space-y-1 transition-colors",
                  reviewKind === "bad" ? "text-gray-900" : " text-gray-400"
                )}
              >
                <div
                  className={cls(
                    "flex items-center justify-center rounded-full",
                    reviewKind === "bad" ? "bg-slate-400" : " bg-slate-100"
                  )}
                >
                  <svg
                    id="bad"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    className="w-12 h-12"
                  >
                    <path
                      id="bad"
                      d="M464 256A208 208 0 1 1 48 256a208 208 0 1 1 416 0zM256 0a256 256 0 1 0 0 512A256 256 0 1 0 256 0zM176.4 240a32 32 0 1 0 0-64 32 32 0 1 0 0 64zm192-32a32 32 0 1 0 -64 0 32 32 0 1 0 64 0zM184 328c-13.3 0-24 10.7-24 24s10.7 24 24 24H328c13.3 0 24-10.7 24-24s-10.7-24-24-24H184z"
                    />
                  </svg>
                </div>
                <span id="bad">별로예요</span>
              </div>
              <div
                id="good"
                onClick={reviewKindHandler}
                className={cls(
                  "flex flex-col items-center justify-center w-24 h-24 rounded-3xl space-y-1 transition-colors",
                  reviewKind === "good" ? "text-green-500" : " text-stone-600"
                )}
              >
                <div
                  className={cls(
                    "flex items-center justify-center rounded-full",
                    reviewKind === "good" ? "bg-green-200" : " bg-slate-100"
                  )}
                >
                  <svg
                    id="good"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    className="w-12 h-12"
                  >
                    <path
                      id="good"
                      d="M464 256A208 208 0 1 0 48 256a208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm177.6 62.1C192.8 334.5 218.8 352 256 352s63.2-17.5 78.4-33.9c9-9.7 24.2-10.4 33.9-1.4s10.4 24.2 1.4 33.9c-22 23.8-60 49.4-113.6 49.4s-91.7-25.5-113.6-49.4c-9-9.7-8.4-24.9 1.4-33.9s24.9-8.4 33.9 1.4zM144.4 208a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zm192-32a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"
                    />
                  </svg>
                </div>
                <span id="good">좋아요</span>
              </div>
              <div
                id="best"
                onClick={reviewKindHandler}
                className={cls(
                  "flex flex-col items-center justify-center w-24 h-24 rounded-3xl space-y-1 transition-colors",
                  reviewKind === "best" ? "text-orange-400" : " text-gray-500"
                )}
              >
                <div
                  className={cls(
                    "flex items-center justify-center rounded-full",
                    reviewKind === "best" ? "bg-orange-300" : " bg-slate-100"
                  )}
                >
                  <svg
                    id="best"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    className="w-12 h-12"
                  >
                    <path
                      id="best"
                      d="M338.9 446.8c-25.4 11-53.4 17.2-82.9 17.2C141.1 464 48 370.9 48 256S141.1 48 256 48s208 93.1 208 208c0 22.4-3.5 43.9-10.1 64.1c3.1 4.5 5.7 9.4 7.8 14.6c12.7-1.6 25.1 .4 36.2 5c9.1-26.2 14-54.4 14-83.7C512 114.6 397.4 0 256 0S0 114.6 0 256S114.6 512 256 512c35.4 0 69.1-7.2 99.7-20.2c-4.8-5.5-8.5-12.2-10.4-19.7l-6.5-25.3zM296 316c0-6.9-3.1-13.2-7.3-18.3c-4.3-5.2-10.1-9.7-16.7-13.4C258.7 276.9 241.4 272 224 272c-3.6 0-6.8 2.5-7.7 6s.6 7.2 3.8 9l0 0 0 0 0 0 .2 .1c.2 .1 .5 .3 .9 .5c.8 .5 2 1.2 3.4 2.1c2.8 1.9 6.5 4.5 10.2 7.6c3.7 3.1 7.2 6.6 9.6 10.1c2.5 3.5 3.5 6.4 3.5 8.6s-1 5-3.5 8.6c-2.5 3.5-5.9 6.9-9.6 10.1c-3.7 3.1-7.4 5.7-10.2 7.6c-1.4 .9-2.6 1.6-3.4 2.1c-.4 .2-.7 .4-.9 .5l-.2 .1 0 0 0 0 0 0 0 0 0 0c-2.5 1.4-4.1 4.1-4.1 7s1.6 5.6 4.1 7l0 0 0 0 0 0 .2 .1c.2 .1 .5 .3 .9 .5c.8 .5 2 1.2 3.4 2.1c2.8 1.9 6.5 4.5 10.2 7.6c3.7 3.1 7.2 6.6 9.6 10.1c2.5 3.5 3.5 6.4 3.5 8.6s-1 5-3.5 8.6c-2.5 3.5-5.9 6.9-9.6 10.1c-3.7 3.1-7.4 5.7-10.2 7.6c-1.4 .9-2.6 1.6-3.4 2.1c-.4 .2-.7 .4-.9 .5l-.2 .1 0 0 0 0 0 0 0 0c-3.2 1.8-4.7 5.5-3.8 9s4.1 6 7.7 6c17.4 0 34.7-4.9 47.9-12.3c6.6-3.7 12.5-8.2 16.7-13.4c4.3-5.1 7.3-11.4 7.3-18.3s-3.1-13.2-7.3-18.3c-4.3-5.2-10.1-9.7-16.7-13.4c-2.7-1.5-5.7-3-8.7-4.3c3.1-1.3 6-2.7 8.7-4.3c6.6-3.7 12.5-8.2 16.7-13.4c4.3-5.1 7.3-11.4 7.3-18.3zM176.4 240a32 32 0 1 0 0-64 32 32 0 1 0 0 64zm159.3-20c10.6 0 19.9 3.8 25.4 9.7c7.6 8.1 20.2 8.5 28.3 .9s8.5-20.2 .9-28.3C375.7 186.8 355 180 335.6 180s-40.1 6.8-54.6 22.3c-7.6 8.1-7.1 20.7 .9 28.3s20.7 7.1 28.3-.9c5.5-5.8 14.8-9.7 25.4-9.7zM434 352.3c-6-23.2-28.8-37-51.1-30.8s-35.4 30.1-29.5 53.4l22.9 89.3c2.2 8.7 11.2 13.9 19.8 11.4l84.9-23.8c22.2-6.2 35.4-30.1 29.5-53.4s-28.8-37-51.1-30.8l-20.2 5.6-5.4-21z"
                    />
                  </svg>
                </div>
                <span id="best">최고예요</span>
              </div>
            </div>
          </div>

          <section className="flex px-5 py-10">
            {reviewKind === "bad" && (
              <div id="badcheckBoxes" className="space-y-3">
                <h3 className="text-lg font-semibold">어떤 점이 별로였나요?</h3>
                <Checkbox
                  options={[
                    "시간약속을 안 지켜요",
                    "채팅 메시지를 읽고도 답이 없어요",
                    "원하지 않는 가격을 계속 요구해요",
                    "예약만 하고 거래 시간을 명확하게 알려주지 않아요",
                    "거래 시간과 장소를 정한 후 거래 직전 취소했어요",
                    "거래 시간과 장소를 정한 후 연락이 안돼요",
                    "약속 장소에 나타나지 않았어요",
                    "상품 상태가 설명과 달라요",
                    "반말을 사용해요",
                    "불친절해요",
                  ]}
                  register={register("checkBoxes")}
                />
              </div>
            )}
            {reviewKind === "good" && (
              <div id="goodcheckBoxes" className="space-y-3">
                <h3 className="text-lg font-semibold">어떤 점이 좋았나요?</h3>
                <Checkbox
                  options={[
                    "물품상태가 설명한 것과 같아요",
                    "나눔을 해주셨어요",
                    "좋은 물품을 저렴하게 판매해요",
                    "물품설명이 자세해요",
                    "시간 약속을 잘 지켜요",
                    "친절하고 매너가 좋아요",
                    "응답이 빨라요",
                  ]}
                  register={register("checkBoxes")}
                />
              </div>
            )}
            {reviewKind === "best" && (
              <div id="bestcheckBoxes" className="space-y-3">
                <h3 className="text-lg font-semibold">어떤 점이 최고였나요?</h3>
                <Checkbox
                  options={[
                    "물품상태가 설명한 것과 같아요",
                    "나눔을 해주셨어요",
                    "좋은 물품을 저렴하게 판매해요",
                    "물품설명이 자세해요",
                    "시간 약속을 잘 지켜요",
                    "친절하고 매너가 좋아요",
                    "응답이 빨라요",
                  ]}
                  register={register("checkBoxes")}
                />
              </div>
            )}
          </section>

          {/* 거래후기 작성 폼 */}
          <div className="space-y-3">
            {reviewKind !== "bad" && (
              <>
                <h3 className="text-lg font-semibold">
                  따뜻한 거래 경험을 알려주세요!
                </h3>
                <span className="text-gray-500 text-sm">
                  남겨주신 거래 후기는 상대방의 프로필에 공개돼요.
                </span>
                <Textarea
                  register={register("reviewWrite", {
                    required: true,
                    minLength: {
                      value: 5,
                      message: "거래 후기를 다섯 글자 이상 입력해주세요.",
                    },
                  })}
                  name="review_write"
                  required
                  placeholder="이웃과 거래한 후기를 작성해 주세요. (5글자 이상 입력하기)"
                />
              </>
            )}
            {reviewKind === "bad" && (
              <>
                <h3 className="text-lg font-semibold">
                  아쉬웠던 점을 당근마켓 팀에 알려주세요.
                </h3>
                <span className="text-gray-500 text-sm">
                  상대방에게 전달되지 않으니 안심하세요.
                </span>
                <Textarea
                  register={register("reviewWrite", {
                    required: true,
                    minLength: {
                      value: 5,
                      message: "거래 후기를 다섯 글자 이상 입력해주세요.",
                    },
                  })}
                  name="review_write_bad"
                  required
                  placeholder="이웃과 거래한 후기를 작성해 주세요. (5글자 이상 입력하기)"
                />
              </>
            )}
            {errors?.reviewWrite ? (
              <span className="my-2 text-red-500 font-medium block">
                {errors.reviewWrite?.message}
              </span>
            ) : null}

            {errors.formErrors ? (
              <span className="my-2 text-red-500 font-medium block">
                {errors.formErrors.message}
              </span>
            ) : null}
            <Button
              loading={loading}
              text={"후기 보내기"}
              onClick={() => clearErrors()}
            />
          </div>

          {/* <Button
            loading={loading}
            text="예약 취소"
            onClick={onCancelReservation}
          /> */}
        </div>
      </form>
    </Layout>
  );
};

export default Review;
