import useSWR from "swr";
import Item from "./item";
import { Product } from "@prisma/client";

export interface ProductWithCountWishes extends Product {
  _count: { wishes: number };
}

interface Record {
  id: number;
  product: ProductWithCountWishes;
}

interface ProductListResponse {
  [key: string]: Record[];
  //sales: Record[], purchases: Record[], wishes: Record[] 다 될 수 있게 설정
  //ok: Boolean;
}

interface ProductListProps {
  kind: "sales" | "purchases" | "wishes";
}

export default function ProductList({ kind }: ProductListProps) {
  const { data } = useSWR<ProductListResponse>(`/api/users/me/${kind}`);
  //객체 프로퍼티
  //object.propertyName === object["propertyName"]
  console.log();
  return (
    <>
      {data?.purchases && !data?.purchases?.length > 0 ? (
        <div className="flex flex-col mt-40 text-center text-sm text-gray-400">
          <p>구매 내역이 없어요.</p>
          <p>동네 이웃과 따뜻한 거래를 해보세요.</p>
        </div>
      ) : null}
      {data?.sales && !data?.sales?.length > 0 ? (
        <div className="flex flex-col mt-40 text-center text-sm text-gray-400">
          <p>판매중인 게시글이 없어요.</p>
        </div>
      ) : null}
      {data?.wishes && !data?.wishes?.length > 0 ? (
        <div className="flex flex-col mt-40 text-center text-sm text-gray-400">
          <p>아직 관심 목록이 없어요.</p>
        </div>
      ) : null}
      {data &&
        data[kind].map((record) => (
          <Item
            productName={record.product.name}
            productInfo={record.product.description}
            productImage={record.product.image}
            price={record.product.price}
            hearts={record.product._count.wishes}
            id={record.id}
            key={record.id}
          />
        ))}
    </>
  );
}
