import { cls } from "@/libs/client/utils";
import Image from "next/image";
import Link from "next/link";
import SmButton from "./smButton";

interface ChatProductInfoProps {
  productName: string;
  price: number;
  productImage: string;
  id: number;
  isSoldOut: boolean;
  onReservation?: () => void;
  writeReview?: () => void;
}

export default function ChatProductInfo({
  productName,
  productImage,
  price,
  id,
  isSoldOut = false,
  onReservation,
  writeReview,
}: ChatProductInfoProps) {
  return (
    <div className="px-4 flex justify-between pt-4">
      <div className="flex flex-col w-full">
        <Link href={`/products/${id}`}>
          <div className="flex space-x-4 cursor-pointer">
            <Image
              src={productImage}
              alt="product-image"
              width={40}
              height={40}
              className="w-16 h-16 bg-slate-300 rounded-md object-fill border-[1px]"
            />
            <div className="pt-2 flex flex-col space-y-1">
              <div className="flex items-center">
                <span
                  className={cls(
                    "text-sm font-medium mr-2",
                    isSoldOut ? "text-emerald-500" : "text-red-500"
                  )}
                >
                  {isSoldOut ? "예약중" : "판매중"}
                </span>
                <h3 className="text-sm text-gray-900">{productName}</h3>
              </div>
              <span className="text-sm font-medium text-gray-900">
                ￦ {price?.toLocaleString()}
              </span>
            </div>
          </div>
        </Link>
        <div className="mt-2 flex space-x-2">
          <SmButton
            onClick={onReservation}
            loading={null}
            text={isSoldOut ? `예약 변경` : `약속 잡기`}
            pathD="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"
          />
          <SmButton
            onClick={writeReview}
            loading={null}
            text={"후기 보내기"}
            pathD="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
          />
        </div>
      </div>
    </div>
  );
}
