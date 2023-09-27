import FloatingButton from "@/components/floating-button";
import Item from "@/components/item";
import Layout from "@/components/layout";
import type { NextPage } from "next";
import Link from "next/link";

//상품 리스트
const Home: NextPage = () => {
  return (
    <Layout title="홈" hasTabBar>
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
      <FloatingButton href="/items/upload" text="글쓰기" />
    </Layout>
  );
};

export default Home;
