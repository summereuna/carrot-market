import { getTimeInterval } from "@/libs/client/utils";
import Image from "next/image";
import Link from "next/link";

interface ItemProps {
  productName: string;
  productCreated: Date;
  price: number;
  productImage: string;
  hearts: number;
  id: number;
  productReservation: boolean;
  productReview: boolean;
}

export default function Item({
  productName,
  productImage,
  productCreated,
  price,
  hearts,
  id,
  productReservation,
  productReview,
}: ItemProps) {
  return (
    <Link href={`/products/${id}`}>
      <div className="px-4 flex justify-between pt-4">
        <div className="flex justify-between w-full">
          <div className="flex space-x-5">
            <Image
              src={productImage}
              alt="product-image"
              width={40}
              height={40}
              className="w-20 h-w-20 bg-slate-300 rounded-md object-fill border-[1px]"
            />
            <div className="pt-2 flex flex-col space-y-1">
              <h3 className="text-sm font-medium text-gray-900">
                {productName}
              </h3>
              <span className="text-xs text-gray-500">
                {getTimeInterval(productCreated)}
              </span>
              <div className="flex space-x-1 items-center">
                {productReservation && (
                  <span className="bg-emerald-500 rounded-md px-2 py-1 text-xs text-white font-medium">
                    예약중
                  </span>
                )}
                {productReview && (
                  <span className="bg-gray-700 rounded-md px-2 py-1 text-xs text-white font-medium">
                    거래완료
                  </span>
                )}
                <span className="font-medium text-gray-900">
                  {price?.toLocaleString()}원
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-end justify-end">
            <div className="flex space-x-0.5 items-center text-sm text-gray-600">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                ></path>
              </svg>
              <span>{hearts}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
