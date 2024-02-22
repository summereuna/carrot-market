import Layout from "@/components/Layout";
import ProductList from "@/components/ProductList";
import type { NextPage } from "next";

//상품 리스트
const Loved: NextPage = () => {
  return (
    <Layout canGoBack title="관심목록">
      <div className="flex flex-col space-y-5 pb-10 divide-y">
        <ProductList kind="wishes" />
      </div>
    </Layout>
  );
};

export default Loved;
