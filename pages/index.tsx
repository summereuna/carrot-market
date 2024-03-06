import FloatingButton from "@/components/FloatingButton";
import Item from "@/components/Item";
import Layout from "@/components/Layout";
import Seo from "@/components/Seo";
import { Product } from "@prisma/client";
import type { GetServerSideProps, NextPage } from "next";
import useSWR, { SWRConfig } from "swr";
import client from "@/libs/server/client";

export interface ProductWithCountWishesAndStateChecks extends Product {
  _count: { wishes: number };
  reservation?: { id: number };
  review?: { id: number; length: number };
}

interface ProductsResponse {
  ok: boolean;
  products: ProductWithCountWishesAndStateChecks[];
}

const Home: NextPage = () => {
  //4. Page 컴포넌트 안엫서 캐시 초기값을 설정해 뒀기 때문에
  //CSR에 있는 useSWR은 캐시에서 데이터를 불러오게 된다.
  //따라서 로딩 상태는 안 보이고 바로 데이터를 가져오는 것 처럼 보인다
  const { data } = useSWR<ProductsResponse>("/api/products");

  return (
    <Layout title="홈" hasTabBar>
      <Seo
        title="홈 | 당근마켓"
        description="당근마켓 클론 | 중고 거래부터 동네 정보까지, 이웃과 함께해요. 가깝고 따뜻한 당신의 근처를 만들어요."
      />
      <div className="flex flex-col space-y-5 pb-3 divide-y">
        {data?.products?.map((product) => (
          <Item
            productName={product.name}
            productCreated={product.created}
            productImage={product.image}
            price={product.price}
            hearts={product._count.wishes}
            id={product.id}
            key={product.id}
            productReservation={product?.reservation?.id ? true : false}
            productReview={
              (product?.review?.length as number) > 0 ? true : false
            }
          />
        ))}
      </div>
      <FloatingButton href="/products/upload" text="글쓰기" />
    </Layout>
  );
};

//3. Page 컴포넌트가 Home 컴포넌트를 SWRConfig로 감싸줌
//SWRConfig 컴포넌트는 fallback 프로퍼티로 캐시 초기 값을 설정할 수 있음
//그러면 Home 컴포넌트가 api주소 키를 이용하여 캐시를 불러온다.
//캐시 값으로 api의 리턴 값을 가져오면 된다.
const Page: NextPage<{ products: ProductWithCountWishesAndStateChecks[] }> = ({
  products,
}) => {
  return (
    <SWRConfig
      value={{
        fallback: {
          "/api/products": {
            ok: true,
            products,
          },
        },
      }}
    >
      <Home />
    </SWRConfig>
  );
};

//1. getServerSideProps 함수 안에서 products를 가져온다.
export const getServerSideProps: GetServerSideProps = async () => {
  const products = await client.product.findMany({
    //거기에 wishes 카운트도 포함해서
    include: {
      _count: {
        select: { wishes: true },
      },
      reservation: { select: { id: true } },
      review: { select: { id: true } },
    },
    orderBy: { created: "desc" },
  });

  return {
    props: { products: JSON.parse(JSON.stringify(products)) },
    // Error serializing props... 에러 해결 위해 parse
  };
};

//2. 내보내는 컴포넌트는 getServerSideProps를 통해 상품 정보를 prop으로 받는 컴포넌트인 Page 컴포넌트로
export default Page;
