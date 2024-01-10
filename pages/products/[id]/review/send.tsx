import Button from "@/components/button";
import Layout from "@/components/layout";
import useUser from "@/libs/client/useUser";
import type { NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import useSWRImmutable from "swr/immutable";
import thanksImg from "@/public/thanksImg.png";

interface GetReservationProductInfoResponse {
  ok: boolean;
  productReservationInfo: {
    image: string;
    name: string;
    userId: number;
    user: { name: string };
    reservation: { date: string; productId: number; userId: number };
  };
  getReview: {
    product: { name: string };
    kind: string;
    review: string;
    reviewCheckBoxes: string;
    createdFor: { name: string };
  };
}

const Send: NextPage = () => {
  const { user } = useUser();
  const router = useRouter();

  const { data: productReservationInfoData } =
    useSWRImmutable<GetReservationProductInfoResponse>(
      router.query.id ? `/api/products/${router.query.id}/review` : null
    );

  const reviews = productReservationInfoData?.getReview?.reviewCheckBoxes
    ?.match(/"([^"]*)"/g)
    .map((match) => match.slice(1, -1));

  return (
    <Layout title="내가 보낸 거래 후기">
      <div className="px-4 py-2 space-y-10">
        {/* 체크박스 */}
        <div className="flex flex-col items-start pt-7 space-y-2">
          <h3 className="text-lg font-semibold ">
            <p>
              {productReservationInfoData?.productReservationInfo?.user?.name}
              님에게
            </p>
            <p>따뜻한 후기를 보냈어요.</p>
          </h3>
          <span className="text-sm text-gray-500">
            {productReservationInfoData?.productReservationInfo?.user?.name}
            님과 {productReservationInfoData?.productReservationInfo?.name}를
            거래했어요.
          </span>
        </div>
        <div className="flex flex-col w-full items-center bg-amber-200 rounded-xl p-4">
          <Image
            src={thanksImg}
            alt="product-image"
            className="w-full h-60 object-contain bg-yellow-50 rounded-t-xl"
          />
          <div className="w-full p-8 bg-yellow-100 rounded-b-xl text-gray-800 space-y-4">
            <p>
              {productReservationInfoData?.getReview?.kind === "bad"
                ? "별로에요."
                : "감사합니다"}
            </p>
            <div className="space-y-2 pl-2">
              {reviews?.map((review, _) => (
                <li key={_}>{review}</li>
              ))}
            </div>
          </div>
        </div>

        <Button text="받은 거래 후기 보기" onClick={router.push(`/`)} />
      </div>
    </Layout>
  );
};

export default Send;
