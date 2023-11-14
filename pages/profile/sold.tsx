import Item from "@/components/item";
import Layout from "@/components/layout";
import { Product, Sale } from "@prisma/client";
import type { NextPage } from "next";
import useSWR from "swr";

interface CountWithProduct extends Product {
  _count: { wishes: number };
}

interface ProductWithSales extends Sale {
  product: CountWithProduct;
}

interface SalesResponse {
  ok: Boolean;
  sales: ProductWithSales[];
}
//상품 리스트
const Sold: NextPage = () => {
  const { data } = useSWR<SalesResponse>("/api/users/me/sales");
  console.log(data);
  return (
    <Layout canGoBack title="판매내역">
      <div className="flex flex-col space-y-5 pb-10 divide-y">
        {data?.sales.map((sale) => (
          <Item
            productName={sale.product.name}
            productInfo={sale.product.description}
            price={sale.product.price}
            hearts={sale.product._count.wishes}
            comments={"00"}
            id={sale.id}
            key={sale.id}
          />
        ))}
      </div>
    </Layout>
  );
};

export default Sold;
