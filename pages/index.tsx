import FloatingButton from "@/components/floating-button";
import Item from "@/components/item";
import Layout from "@/components/layout";
import useUser from "@/libs/client/useUser";
import { Product } from "@prisma/client";
import type { NextPage } from "next";
import Head from "next/head";
import useSWR from "swr";

export interface ProductWithCountWishesAndStateChecks extends Product {
  _count: { wishes: number };
  reservation?: { id: number };
  review?: { id: number };
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
      <Head>
        <title>홈</title>
      </Head>
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
            productReview={product?.review?.id ? true : false}
          />
        ))}
      </div>
      <FloatingButton href="/products/upload" text="글쓰기" />
    </Layout>
  );
};

export default Home;
