import { cls } from "@/libs/client/utils";

interface ButtonProps {
  text: string;
  large?: boolean;
  disabled?: boolean;
  [key: string]: any;
}

export default function Button({
  large = false,
  onClick,
  loading,
  text,
  disabled,
  ...rest
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      {...rest}
      className={cls(
        "w-full px-4 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2  shadow-sm font-medium ",
        large ? "py-3 text-base" : "py-2 text-sm",
        disabled
          ? "bg-gray-400"
          : "bg-orange-500 hover:bg-orange-600 focus:ring-orange-500"
      )}
      disabled={disabled}
    >
      {loading ? "로딩 중..." : text}
    </button>
  );
}
