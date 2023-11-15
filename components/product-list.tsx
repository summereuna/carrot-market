import { ProductWithCountWishes } from "@/pages";
import useSWR from "swr";
import Item from "./item";

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
  return data ? (
    <>
      {data[kind].map((record) => (
        <Item
          productName={record.product.name}
          productInfo={record.product.description}
          price={record.product.price}
          hearts={record.product._count.wishes}
          comments={"00"}
          id={record.id}
          key={record.id}
        />
      ))}
    </>
  ) : null;
}
