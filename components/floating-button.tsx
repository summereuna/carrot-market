import { cls } from "@/libs/client/utils";
import Link from "next/link";

interface FloatingButtonProps {
  href: string;
  text: string;
}

export default function FloatingButton({ href, text }: FloatingButtonProps) {
  return (
    <Link href={href}>
      {/*플로팅 버튼: 클릭 시 상품 추가하는 페이지로*/}
      <button className="flex space-x-1 fixed bottom-24 right-5 bg-orange-400 rounded-full p-4 text-white shadow-xl transition-colors hover:bg-orange-500 cursor-pointer border-transparent">
        <svg
          className="h-6 w-6"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
          />
        </svg>
        <span>{text}</span>
      </button>
    </Link>
  );
}
