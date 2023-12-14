import Button from "@/components/button";
import Layout from "@/components/layout";
import useMutation from "@/libs/client/useMutation";
import { utcToKoreanTime } from "@/libs/client/utils";
import { ChatRoom, Product, Reservation } from "@prisma/client";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import useSWR from "swr";

interface GetReservationResponse {
  ok: boolean;
  productReservation?: { reservation: Reservation };
}

interface MakeReservationForm {
  date: Date;
  formErrors?: string;
}

// chats/[id]/reservation 페이지에서 useMutation으로 POST 요청 보냈을 때 응답 결과로 받는 반환값
interface MakeReservationMutationResponse {
  ok: boolean;
  data?: Reservation;
}

const Reservation: NextPage = () => {
  const router = useRouter();

  const useSWRConfigurationOption = {
    //useSWR이 서버에서 얼마나 자주 새로고침 될지 명시
    refreshInterval: 1000, //1초
  };

  const { data: productReservationData, mutate: boundMutate } =
    useSWR<GetReservationResponse>(
      router.query.id ? `/api/products/${router.query.id}/reservation` : null,
      useSWRConfigurationOption
    );

  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<MakeReservationForm>();

  const [makeReservation, { loading, data: makeReservationData, error }] =
    useMutation<MakeReservationMutationResponse>(
      `/api/products/${router.query?.id}/reservation`
    );

  const onValid = async ({ date }: MakeReservationForm) => {
    //로딩 중이면 멈춤
    if (loading) return;

    //로딩중 아니면 uploadProduct() 실행하여 데이터 받아서 뮤테이션 하기
    if (date) {
      makeReservation({
        date,
      });
    } else {
      return setError("formErrors", {
        message: "날짜와 시간을 선택하세요.",
      });
    }
  };

  // const [
  //   cancelReservation,
  //   { loading: cancelLoading, data: cancelData, error: cancelError },
  // ] = useMutation<MakeReservationMutationResponse>(
  //   `/api/products/${router.query?.id}/reservation`
  // );
  const onCancelReservation = () => {
    const confirmCancelReservation = confirm("정말 예약을 취소하시겠습니까?");
    if (confirmCancelReservation) {
      makeReservation({});
    }
  };

  useEffect(() => {
    if (makeReservationData?.ok) {
      console.log(makeReservationData);
      router.push(`/chats`);
      //예약 완료 시 채팅방으로 돌아가기
    }
  }, [makeReservationData, router]);

  // const reservationDate = watch("date");
  // console.log(reservationDate, reservationTime);
  // const [previewReservationDate, setPreviewReservationDate] = useState({
  //   date: "2023년 12월 1일",
  //   time: "오후 1:30",
  // });
  // // const [previewReservationDate, setPreviewReservationDate] = useState({
  // //   date: "",
  // //   time: "",
  // // });

  // useEffect(() => {
  //   if (reservationDate && reservationTime) {
  //     setPreviewReservationDate({
  //       date: reservationDate.toLocaleDateString(),
  //       time: reservationTime.getUTCHours().toString(),
  //     });
  //   }
  // }, [reservationDate, reservationTime]);

  return (
    <Layout canGoBack title="약속 잡기">
      <form onSubmit={handleSubmit(onValid)}>
        <div className="px-4 py-2 space-y-5">
          <label
            htmlFor="reservationDate"
            className="block text-sm font-semibold text-gray-700"
          >
            약속 시간
          </label>
          <div>
            <span className="font-semibold text-lg">
              {productReservationData?.productReservation?.reservation
                ? utcToKoreanTime(
                    productReservationData?.productReservation?.reservation.date
                  )
                : "약속 시간을 정해 예약을 완료하세요."}
            </span>
          </div>
          <input
            id="reservationDate"
            type="datetime-local"
            {...register("date", {
              required: true,
              valueAsDate: true,
            })}
            required
            className="text-gray-800 font-bold placeholder:text-gray-500 placeholder:font-bold placeholder:text-lg  appearance-none w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-400 focus:border-orange-400
                "
          />
          {errors.formErrors ? (
            <span className="my-2 text-red-500 font-medium block">
              {errors.formErrors.message}
            </span>
          ) : null}
          <Button
            loading={loading}
            text={
              productReservationData?.productReservation?.reservation &&
              productReservationData?.productReservation?.reservation
                .created !==
                productReservationData?.productReservation?.reservation.updated
                ? "예약 변경"
                : "예약 완료"
            }
            onClick={() => clearErrors()}
          />
          <Button
            loading={loading}
            text="예약 취소"
            onClick={onCancelReservation}
          />
        </div>
      </form>
    </Layout>
  );
};

export default Reservation;
