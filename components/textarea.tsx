interface TextareaProps {
  label?: string;
  name?: string;
  placeholder?: string;
  [key: string]: any;
}

export default function Textarea({
  label,
  name,
  placeholder,
  ...rest
}: TextareaProps) {
  return (
    <div>
      {label ? (
        <label
          htmlFor={name}
          className="mb-1 block text-sm font-semibold text-gray-700"
        >
          {label}
        </label>
      ) : null}
      <textarea
        {...rest}
        id={name}
        rows={4}
        placeholder={placeholder}
        className="mt-1 shadow-sm w-full placeholder-gray-400  border-gray-300 focus:outline-none focus:ring-orange-400 focus:border-orange-400 rounded-md "
      />
    </div>
  );
}
