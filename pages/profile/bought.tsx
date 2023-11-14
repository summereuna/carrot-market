import Item from "@/components/item";
import Layout from "@/components/layout";
import { Product, Purchase } from "@prisma/client";
import type { NextPage } from "next";
import useSWR from "swr";

interface CountWithProduct extends Product {
  _count: { wishes: number };
}

interface ProductWithPurchases extends Purchase {
  product: CountWithProduct;
}

interface PurchasesResponse {
  ok: Boolean;
  purchases: ProductWithPurchases[];
}
//상품 리스트
const Bought: NextPage = () => {
  const { data } = useSWR<PurchasesResponse>("/api/users/me/purchases");
  console.log(data);
  return (
    <Layout canGoBack title="구매내역">
      <div className="flex flex-col space-y-5 pb-10 divide-y">
        {data?.purchases.map((purchase) => (
          <Item
            productName={purchase.product.name}
            productInfo={purchase.product.description}
            price={purchase.product.price}
            hearts={purchase.product._count.wishes}
            comments={"00"}
            id={purchase.id}
            key={purchase.id}
          />
        ))}
      </div>
    </Layout>
  );
};

export default Bought;
