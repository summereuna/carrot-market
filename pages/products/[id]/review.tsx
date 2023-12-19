import Button from "@/components/button";
import Checkboxes from "@/components/checkBoxes";
import Layout from "@/components/layout";
import Textarea from "@/components/textarea";
import useMutation from "@/libs/client/useMutation";
import { cls } from "@/libs/client/utils";
import { Review } from "@prisma/client";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

interface ReviewForm {
  reviewWrite: string;
  badReviewsCheckBox: string[];
  goodReviewsCheckBox: string[];
  bestReviewsCheckBox: string[];
  formErrors?: string;
}

interface ReviewDataMutationResponse {
  ok: boolean;
  data: Review;
}

const Review: NextPage = () => {
  const router = useRouter();

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
    control,
    formState: { errors },
  } = useForm<ReviewForm>({
    defaultValues: {
      reviewWrite: "",
      badReviewsCheckBox: [],
      goodReviewsCheckBox: [],
      bestReviewsCheckBox: [],
    },
  });

  const onValidSubmit = async ({
    reviewWrite,
    badReviewsCheckBox,
    goodReviewsCheckBox,
    bestReviewsCheckBox,
  }: ReviewForm) => {
    //로딩 중이면 멈춤
    if (loading) return;

    //로딩중 아니면 uploadProduct() 실행하여 데이터 받아서 뮤테이션 하기
    if (reviewWrite && badReviewsCheckBox.length > 0) {
      console.log(reviewWrite, badReviewsCheckBox);
      // sendReview({ reviewWrite, badReviewsCheckBox });
    } else if (reviewWrite && goodReviewsCheckBox.length > 0) {
      console.log(reviewWrite, goodReviewsCheckBox);
      // sendReview({ reviewWrite, goodReviewsCheckBox });
    } else if (reviewWrite && bestReviewsCheckBox.length > 0) {
      console.log(reviewWrite, bestReviewsCheckBox);
      // sendReview({ reviewWrite, bestReviewsCheckBox });
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
      badReviewsCheckBox: [],
      goodReviewsCheckBox: [],
      bestReviewsCheckBox: [],
    }));
  }, [reviewKind, reset]);

  useEffect(() => {
    if (makeReviewData?.ok) {
      console.log(makeReviewData);
      reset();
      router.push(`/`);
      //후기 작성 완료시 홈으로
    }
  }, [makeReviewData, router, reset]);

  return (
    <Layout canGoBack title="거래 후기 보내기">
      <form onSubmit={handleSubmit(onValidSubmit)}>
        <div className="px-4 py-2">
          {/* <label
            htmlFor="reservationDate"
            className="block text-sm font-semibold text-gray-700"
          >
            거래 후기
          </label> */}

          {/* 거래후기 작성 폼 */}
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

          {/* 체크박스 */}

          <div className="flex flex-col items-center border-b py-7 space-y-5">
            <h3 className="text-lg font-semibold ">
              {}님 과의 거래가 어땠나요?
            </h3>
            <div className="flex justify-between w-full px-5 font-semibold">
              <div
                id="bad"
                onClick={reviewKindHandler}
                className={cls(
                  "flex flex-col items-center justify-center w-24 h-24 rounded-3xl space-y-1 transition-colors",
                  reviewKind === "bad" ? "text-gray-900" : " text-gray-500"
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
                  reviewKind === "good" ? "text-green-500" : " text-gray-500"
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
              <div id="badReviewsCheckBox" className="space-y-3">
                <h3 className="text-lg font-semibold">어떤 점이 별로였나요?</h3>
                <Checkboxes
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
                  control={control}
                  name="badReviewsCheckBox"
                />
              </div>
            )}
            {reviewKind === "good" && (
              <div id="goodReviewsCheckBox" className="space-y-3">
                <h3 className="text-lg font-semibold">어떤 점이 좋았나요?</h3>
                <Checkboxes
                  options={[
                    "상품상태가 설명한 것과 같아요",
                    "상품설명이 자세해요",
                    "좋은 상품을 저렴하게 판매해요",
                    "시간 약속을 잘 지켜요",
                    "응답이 빨라요",
                    "친절하고 매너가 좋아요",
                  ]}
                  control={control}
                  name="goodReviewsCheckBox"
                />
              </div>
            )}
            {reviewKind === "best" && (
              <div id="bestReviewsCheckBox" className="space-y-3">
                <h3 className="text-lg font-semibold">어떤 점이 최고였나요?</h3>
                <Checkboxes
                  options={[
                    "무료로 나눠주셨어요",
                    "상품상태가 설명한 것과 같아요",
                    "상품설명이 자세해요",
                    "좋은 상품을 저렴하게 판매해요",
                    "시간 약속을 잘 지켜요",
                    "응답이 빨라요",
                    "친절하고 매너가 좋아요",
                  ]}
                  control={control}
                  name="bestReviewsCheckBox"
                />
              </div>
            )}
          </section>
          {/* <section> */}
          {/* <CheckBox
              option="무료로 나눠주셨어요"
              id="1"
              register={register("reviewsCheckBox")}
            />
            <CheckBox
              option="상품상태가 설명한 것과 같아요"
              id="2"
              register={register("reviewsCheckBox")}
            />
            <CheckBox
              option="상품설명이 자세해요"
              id="3"
              register={register("reviewsCheckBox")}
            />
            <CheckBox
              option="좋은 상품을 저렴하게 판매해요"
              id="4"
              register={register("reviewsCheckBox")}
            />
            <CheckBox
              option="시간 약속을 잘 지켜요"
              id="5"
              register={register("reviewsCheckBox")}
            />
            <CheckBox
              option="응답이 빨라요"
              id="6"
              register={register("reviewsCheckBox")}
            />
            <CheckBox
              option="친절하고 매너가 좋아요"
              id="7"
              register={register("reviewsCheckBox")}
            /> */}
          {/* </section> */}
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
