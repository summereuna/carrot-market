import Item from "@/components/item";
import Layout from "@/components/layout";
import type { NextPage } from "next";

//상품 리스트
const Loved: NextPage = () => {
  return (
    <Layout canGoBack>
      <div className="flex flex-col space-y-5 pb-10 divide-y">
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
    </Layout>
  );
};

export default Loved;
