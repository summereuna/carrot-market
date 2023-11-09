import FloatingButton from "@/components/floating-button";
import Item from "@/components/item";
import Layout from "@/components/layout";
import useUser from "@/libs/client/useUser";
import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";

//상품 리스트
const Home: NextPage = () => {
  const { user, isLoading } = useUser();
  console.log(user);
  return (
    <Layout title="홈" hasTabBar>
      <Head>
        <title>홈</title>
      </Head>
      <div className="flex flex-col space-y-5 pb-3 divide-y">
        {[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1].map((_, i) => (
          <Item
            productName="아이폰 15"
            productInfo="검정색"
            price={1100000}
            hearts={1}
            comments={0}
            id={i}
            key={i}
          />
        ))}
      </div>
      <FloatingButton href="/products/upload" text="글쓰기" />
    </Layout>
  );
};

export default Home;
