interface SmButtonProps {
  text: string;
  [key: string]: any;
}

export default function SmButton({
  onClick,
  loading,
  text,
  pathD,
  ...rest
}: SmButtonProps) {
  return (
    <button
      onClick={onClick}
      {...rest}
      className="cursor-pointer w-32 space-x-2 py-2 px-2 flex items-center justify-center hover:bg-slate-100 focus:bg-slate-100 transition-colors rounded-lg border-[1px]"
    >
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
      <div>
        <span className="font-semibold text-sm">
          {loading ? "로딩 중..." : text}
        </span>
      </div>
    </button>
  );
}
