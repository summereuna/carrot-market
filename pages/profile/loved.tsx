import Item from "@/components/item";
import Layout from "@/components/layout";
import { Product, Wish } from "@prisma/client";
import type { NextPage } from "next";
import useSWR from "swr";

interface CountWithProduct extends Product {
  _count: { wishes: number };
}

interface ProductWithWish extends Wish {
  product: CountWithProduct;
}

interface WishesResponse {
  ok: Boolean;
  wishes: ProductWithWish[];
}
//상품 리스트
const Loved: NextPage = () => {
  const { data } = useSWR<WishesResponse>("/api/users/me/wishes");
  console.log(data);
  return (
    <Layout canGoBack title="관심목록">
      <div className="flex flex-col space-y-5 pb-10 divide-y">
        {data?.wishes.map((wish) => (
          <Item
            productName={wish.product.name}
            productInfo={wish.product.description}
            price={wish.product.price}
            hearts={wish.product._count.wishes}
            comments={"00"}
            id={wish.id}
            key={wish.id}
          />
        ))}
      </div>
    </Layout>
  );
};

export default Loved;
