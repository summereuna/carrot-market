import Layout from "@/components/Layout";
import type { NextPage } from "next";
import useSWR from "swr";
import { useRouter } from "next/router";
import Image from "next/image";
import Item from "@/components/Item";
import { Product, Sale } from "@prisma/client";
import Tabs from "@/components/Tabs";
import Seo from "@/components/Seo";

interface ProductWithIsOnSales extends Product {
  _count: { wishes: number };
  reservation?: { id: number };
  review?: { id: number }[];
}

interface SaleWithProduct extends Sale {
  product: ProductWithIsOnSales;
}

export interface UserSalesResponse {
  ok: boolean;
  user: { id: number; name: string; avatar: string };
  sales: SaleWithProduct[];
}

//상품 리스트
const Sales: NextPage = () => {
  const router = useRouter();
  const { data } = useSWR<UserSalesResponse>(
    router.query.id ? `/api/users/${router.query?.id}/sales` : null
  );

  const tabs = [
    {
      id: 1,
      label: "전체",
      content: data?.sales.map((sale) => (
        <Item
          productName={sale.product.name}
          productCreated={sale.product.created}
          productImage={sale.product.image}
          price={sale.product.price}
          hearts={sale.product._count.wishes}
          id={sale.id}
          key={sale.id}
          productReservation={sale.product.reservation?.id ? true : false}
          productReview={
            (sale.product.review?.length as number) > 0 ? true : false
          }
        />
      )),
    },
    {
      id: 2,
      label: "거래중",
      content: data?.sales
        ?.filter((sale) =>
          Boolean(
            sale?.product?.reservation?.id &&
              !(sale?.product?.review?.length! > 0)
          )
        )
        .map((saleItem) => (
          <Item
            productName={saleItem.product.name}
            productCreated={saleItem.product.created}
            productImage={saleItem.product.image}
            price={saleItem.product.price}
            hearts={saleItem.product._count.wishes}
            id={saleItem.id}
            key={saleItem.id}
            productReservation={saleItem.product.reservation?.id ? true : false}
            productReview={
              (saleItem.product.review?.length as number) > 0 ? true : false
            }
          />
        )),
    },
    {
      id: 3,
      label: "거래완료",
      content: data?.sales
        ?.filter((sale) => Boolean(sale?.product?.review?.length! > 0))
        .map((saleItem) => (
          <Item
            productName={saleItem.product.name}
            productCreated={saleItem.product.created}
            productImage={saleItem.product.image}
            price={saleItem.product.price}
            hearts={saleItem.product._count.wishes}
            id={saleItem.id}
            key={saleItem.id}
            productReservation={saleItem.product.reservation?.id ? true : false}
            productReview={
              (saleItem.product.review?.length as number) > 0 ? true : false
            }
          />
        )),
    },
  ];

  return (
    <Layout canGoBack title="판매내역">
      <Seo
        title={`판매내역 | ${data?.user?.name}님의 프로필`}
        description="당근마켓 유저 프로필 판매내역"
      />
      {data?.user && (
        <div className="flex justify-between py-5 px-5">
          <span className="text-xl font-semibold">
            {data.user.name}님의 판매 상품
          </span>
          <div>
            {data.user.avatar ? (
              <Image
                src={data.user.avatar}
                alt="avatar-preview"
                width={40}
                height={40}
                className="w-20 h-w-20 rounded-full bg-slate-300 object-cover"
                priority
              />
            ) : (
              <div className="w-20 h-20 bg-slate-300 rounded-full"></div>
            )}
          </div>
        </div>
      )}
      {data?.sales && <Tabs tabs={tabs} />}
    </Layout>
  );
};

export default Sales;
