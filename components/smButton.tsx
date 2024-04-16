import { cls } from "@/libs/client/utils";

interface SmButtonProps {
  text: string;
  onClick?: () => void;
  bgGray?: boolean;
  pathD?: string;
  disabled?: boolean;
  [key: string]: any;
}

export default function SmButton({
  onClick,
  loading,
  text,
  pathD,
  disabled,
  bgGray = false,
  ...rest
}: SmButtonProps) {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      {...rest}
      className={cls(
        `space-x-2 py-2 px-3 flex items-center justify-center  transition-colors rounded-lg `,
        bgGray
          ? "bg-gray-100 enabled:hover:bg-gray-200 enabled:focus:bg-gray-200"
          : "border-[1px] enabled:hover:bg-slate-100 enabled:focus:bg-slate-100",
        disabled ? "bg-gray-200 text-gray-500 hover:" : "bg-white"
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
