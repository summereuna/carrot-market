import type { UseFormRegisterReturn } from "react-hook-form";

interface CheckBoxProps {
  options: string[];
  register: UseFormRegisterReturn;
}

export default function Checkboxes({ options, register }: CheckBoxProps) {
  return (
    <>
      {options.map((option: string, index: any) => (
        <div className="space-x-2 flex items-center" key={index}>
          <input
            className="appearance-none w-4 h-4 text-orange-600 bg-gray-100 border-gray-300 rounded-full focus:ring-orange-500 dark:focus:ring-orange-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            type="checkbox"
            id={index}
            value={option}
            {...register}
          />
          <label htmlFor={index} className="block text-gray-700">
            {option}
          </label>
        </div>
      ))}
    </>
  );
}
