import Layout from "@/components/Layout";
import ProductList from "@/components/ProductList";
import type { NextPage } from "next";

//상품 리스트
const Sold: NextPage = () => {
  return (
    <Layout canGoBack title="판매내역">
      <div className="flex flex-col space-y-5 pb-10 divide-y">
        <ProductList kind="sales" />
      </div>
    </Layout>
  );
};

export default Sold;
