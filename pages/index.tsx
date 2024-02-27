import FloatingButton from "@/components/FloatingButton";
import Item from "@/components/Item";
import Layout from "@/components/Layout";
import Seo from "@/components/Seo";
import useUser from "@/libs/client/useUser";
import { Product } from "@prisma/client";
import type { NextPage } from "next";
import useSWR from "swr";

export interface ProductWithCountWishesAndStateChecks extends Product {
  _count: { wishes: number };
  reservation?: { id: number };
  review?: { id: number; length: number };
}

interface ProductsResponse {
  ok: boolean;
  products: ProductWithCountWishesAndStateChecks[];
}

//상품 리스트
const Home: NextPage = () => {
  const { user, isLoading } = useUser();
  //console.log(user);

  const { data } = useSWR<ProductsResponse>("/api/products");
  console.log(data?.products);

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

export default Home;
