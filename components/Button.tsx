import { cls } from "@/libs/client/utils";

interface ButtonProps {
  text: string;
  large?: boolean;
  disabled?: boolean;
  bgGray?: boolean;
  [key: string]: any;
}

export default function Button({
  large = false,
  onClick,
  loading,
  text,
  disabled,
  bgGray,
  ...rest
}: ButtonProps) {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      {...rest}
      className={cls(
        "w-full px-4 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2  shadow-sm font-medium bg-lime-600 hover:bg-lime-700",
        large ? "py-3 text-base" : "py-2 text-sm",
        bgGray
          ? "enabled:bg-gray-500 enabled:hover:bg-gray-500 enabled:focus:bg-gray-500"
          : "",
        disabled ? "disabled bg-gray-500 hover:bg-gray-500 text-white" : ""
      )}
    >
      {loading ? "로딩 중..." : text}
    </button>
  );
}
