import Button from "@/components/button";
import Layout from "@/components/layout";
import UserBox from "@/components/user-box";
import { threeDigitDivision } from "@/libs/server/utils";
import { Product, User } from "@prisma/client";
import type { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import useSWR from "swr";

//프리즈마 클라이언트의 Product 타입에는 연결된 user에 대한 타입이 없으므로 확장시켜주기
interface ProductWithUser extends Product {
  user: User;
}

interface ProductDetailResponse {
  ok: boolean;
  product: ProductWithUser;
  relatedProducts: Product[];
}

const ProductDetail: NextPage = () => {
  const router = useRouter();
  //router가 마운트 중이기 때문에 /${router.query.id}로 바로 보낼 수 없다
  //undefined 뜰 수도 있기 때문에 처음부터 id에 접근할 수 없으므로 먼저 있는지 체크하자 => optional query
  const { data } = useSWR<ProductDetailResponse>(
    router.query.id ? `/api/products/${router.query?.id}` : null
  );

  //? data 객체 있으면 데이터 출력하거나 로딩중임을 표시하는게 좋음
  //1초 이상 걸리는 작업에는 로딩 중임을 표시하는게 더 좋음
  //일단 ?로 만들고 나중에 필요하면 스켈레톤 넣기
  return (
    <Layout canGoBack>
      <div className="px-4 py-10">
        <div className="mb-8">
          {/*product-image
          data?.product?.image
          */}
          <div className="h-96 bg-slate-300" />
          {/*user-profile
          data?.product?.user?.avatar
          */}
          <Link href={`/users/profiles/${data?.product?.userId}`}>
            <div className="py-3 border-t border-b">
              <UserBox
                name={data?.product?.user?.name}
                size="small"
                time={`${data?.product?.created}시간 전`}
              />
            </div>
          </Link>
          {/*product-info*/}
          <div className="mt-10">
            <h1 className="text-3xl font-bold text-gray-900">
              {data?.product?.name}
            </h1>
            <span className="mt-3 block text-3xl text-gray-900">
              ₩
              {data?.product?.price
                ? threeDigitDivision(data.product.price)
                : null}
            </span>
            <p className="text-base my-6 text-gray-700">
              {data?.product?.description}
            </p>
            <div className="flex items-center justify-between space-x-2">
              {/*direct-message btn*/}
              <Button text="채팅하기" large />
              {/*add to like-list btn*/}
              <button className="p-3 flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-200">
                <svg
                  className="h-6 w-6 "
                  xmlns="http://www.w3.org/3000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/*recommend items*/}
        <div className="mt-5">
          <h2 className="text-2xl font-bold text-gray-900">비슷한 상품</h2>
          <div className="mt-6 grid grid-cols-2 gap-4">
            {data?.relatedProducts.map((product) => (
              <div key={product?.id}>
                <Link href={`/products/${product?.id}`}>
                  <div className="mb-4 h-56 max-w-full bg-slate-300" />
                  <h3 className="text-gray-700 -mb-1">{product?.name}</h3>
                  <span className="text-sm font-medium text-gray-900">
                    ₩ {threeDigitDivision(product?.price)}
                  </span>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetail;
