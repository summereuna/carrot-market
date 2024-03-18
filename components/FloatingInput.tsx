import type { UseFormRegisterReturn } from "react-hook-form";

interface FloatingInputProps {
  name: string;
  placeholder: string;
  required: boolean;
  register: UseFormRegisterReturn;
  errorMessage?: string | null;
  isLoading?: boolean;
}

export default function FloatingInput({
  name,
  placeholder,
  required,
  register, //react-hook-form register 프롭으로 보낸거 받기
  errorMessage,
  isLoading,
}: FloatingInputProps) {
  return (
    <>
      <input
        {...register}
        name={name}
        type="text"
        placeholder={errorMessage ? errorMessage : placeholder}
        required={required}
        className="pr-14 shadow-sm rounded-full w-full border-gray-300 focus:outline-none focus:border-orange-500 focus:ring-orange-500"
      />
      <div className="absolute inset-y-0 flex py-1.5 pr-1.5 right-0">
        <button className="flex items-center bg-orange-500 rounded-full pr-2 pl-3 hover:bg-orange-600 focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 text-sm text-white">
          {isLoading ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
              />
            </svg>
          )}
        </button>
      </div>
    </>
  );
}
