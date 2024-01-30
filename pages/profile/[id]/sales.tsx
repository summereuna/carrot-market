import Layout from "@/components/layout";
import ProductList from "@/components/product-list";
import type { NextPage } from "next";

//상품 리스트
const Sales: NextPage = () => {
  return (
    <Layout canGoBack title="판매내역">
      <div className="flex flex-col space-y-5 pb-10 divide-y">
        <ProductList kind="sales" isMe={false} />
      </div>
    </Layout>
  );
};

export default Sales;
