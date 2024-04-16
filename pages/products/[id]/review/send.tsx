import Layout from "@/components/Layout";
import type { NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import useSWRImmutable from "swr/immutable";
import thanksImg from "@/public/thanksImg.png";
import { changeStringToArrayReviewBoxes, cls } from "@/libs/client/utils";
import Seo from "@/components/Seo";

interface GetReservationProductInfoResponse {
  ok: boolean;
  productInfo: {
    image: string;
    name: string;
    userId: number;
    user: { name: string };
    reservation: { date: string; productId: number; userId: number };
  };
  reviewInfo: {
    product: { name: string };
    kind: string;
    review: string;
    reviewCheckBoxes: string;
    createdFor: { name: string };
  };
}

const Send: NextPage = () => {
  const router = useRouter();

  const { data } = useSWRImmutable<GetReservationProductInfoResponse>(
    router.query.id ? `/api/products/${router.query.id}/review` : null
  );

  return (
    <>
      {data?.reviewInfo && (
        <Layout title="내가 보낸 거래 후기" canGoHome>
          <Seo
            title="내가 보낸 거래 후기 | 중고거래"
            description="당근마켓 중고거래 내가 보낸 거래 후기"
          />

          <div className="px-4 py-2 space-y-10">
            {/* 체크박스 */}
            <div className="flex flex-col items-start pt-7 space-y-2">
              <h3 className="text-lg font-semibold ">
                <p>
                  {data?.reviewInfo?.createdFor?.name}
                  님에게
                </p>
                <p>따뜻한 후기를 보냈어요.</p>
              </h3>
              <span className="text-sm text-gray-500">
                {data?.reviewInfo?.createdFor?.name}
                님과 {data?.productInfo?.name}를 거래했어요.
              </span>
            </div>
            <div
              className={cls(
                "flex flex-col w-full items-center rounded-xl p-4",
                data?.reviewInfo?.kind === "bad"
                  ? "bg-gray-200"
                  : "bg-amber-200"
              )}
            >
              <Image
                src={thanksImg}
                alt="product-image"
                className={cls(
                  "w-full h-60 object-contain rounded-t-xl",
                  data?.reviewInfo?.kind === "bad" ? "bg-white" : "bg-yellow-50"
                )}
                priority
              />
              <div
                className={cls(
                  "w-full p-8 rounded-b-xl text-gray-800 space-y-4",
                  data?.reviewInfo?.kind === "bad"
                    ? "bg-gray-100"
                    : "bg-yellow-100"
                )}
              >
                <p>{data?.reviewInfo?.review}</p>
                <div className="space-y-2 pl-2">
                  {changeStringToArrayReviewBoxes(
                    data?.reviewInfo?.reviewCheckBoxes
                  ).map((review, _) => (
                    <li key={_}>{review}</li>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Layout>
      )}
      {!data && (
        <Layout title="내가 보낸 거래 후기" canGoHome>
          <Seo
            title="내가 보낸 거래 후기 | 중고거래"
            description="당근마켓 중고거래 내가 보낸 거래 후기"
          />
          <div className="flex justify-center mt-20">잘못된 접근입니다.</div>
        </Layout>
      )}
    </>
  );
};

export default Send;
