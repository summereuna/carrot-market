import { useState } from "react";
import { useController } from "react-hook-form";
import type { UseFormRegisterReturn } from "react-hook-form";

interface CheckBoxesProps {
  options: string[];
  control: any;
  name: string;
}

export default function Checkboxes({
  options,
  control,
  name,
}: CheckBoxesProps) {
  const { field } = useController({
    control,
    name,
  });
  const [value, setValue] = useState(field.value || []);

  return (
    <>
      {options.map((option: string, index: any) => (
        <div className="space-x-2 flex items-center" key={index}>
          <input
            className="appearance-none w-4 h-4 rounded-full text-orange-600 bg-gray-100 border-gray-300 rounded focus:ring-orange-500 dark:focus:ring-orange-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            type="checkbox"
            id={index}
            onChange={(e) => {
              const valueCopy = [...value];

              // update checkbox value
              valueCopy[index] = e.target.checked ? e.target.value : null;

              // send data to react hook form
              field.onChange(valueCopy);

              // update local state
              setValue(valueCopy);
            }}
            checked={value.includes(option)}
            value={option}
          />
          <label htmlFor={index} className="block text-gray-700">
            {option}
          </label>
        </div>
      ))}
    </>
  );
}
