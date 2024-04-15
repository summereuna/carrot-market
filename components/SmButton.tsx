import { cls } from "@/libs/client/utils";

interface SmButtonProps {
  text: string;
  onClick?: () => void;
  bgGray?: boolean;
  pathD?: string;
  [key: string]: any;
}

export default function SmButton({
  onClick,
  loading,
  text,
  pathD,
  bgGray = false,
  ...rest
}: SmButtonProps) {
  return (
    <button
      onClick={onClick}
      {...rest}
      className={cls(
        `cursor-pointer space-x-2 py-2 px-3 flex items-center justify-center  transition-colors rounded-lg `,
        bgGray
          ? "bg-gray-100 hover:bg-gray-200 focus:bg-gray-200"
          : "border-[1px] hover:bg-slate-100 focus:bg-slate-100"
      )}
    >
      {pathD && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d={pathD} />
        </svg>
      )}
      <div>
        <span className="font-semibold text-sm">
          {loading ? "로딩 중..." : text}
        </span>
      </div>
    </button>
  );
}
