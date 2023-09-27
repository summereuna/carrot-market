interface InputProps {
  label: string;
  name: string;
  kind?: "text" | "email" | "phone" | "price";
  placeholder?: string;
  [key: string]: any;
}

export default function Input({
  label,
  name,
  kind,
  placeholder,
  ...rest
}: InputProps) {
  return (
    <div className="space-y-1">
      <label
        htmlFor={name}
        className="block text-sm font-semibold text-gray-700"
      >
        {label}
      </label>

      {kind == "text" ? (
        <div className="relative rounded-md shadow-sm flex items-center">
          <input
            {...rest}
            id={name}
            type="text"
            placeholder={placeholder}
            required
            className="appearance-none w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-400 focus:border-orange-400"
          />
        </div>
      ) : null}

      {kind == "email" ? (
        <div className="relative rounded-md shadow-sm flex items-center">
          <input
            {...rest}
            id={name}
            type="email"
            placeholder={placeholder}
            required
            className="appearance-none w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-400 focus:border-orange-400"
          />
        </div>
      ) : null}

      {kind === "price" ? (
        <div className="relative rounded-md shadow-sm flex items-center">
          <div className="absolute left-0 pl-3 flex items-center justify-center">
            <span className="text-gray-500 text-sm pointer-events-none">₩</span>
          </div>
          <input
            {...rest}
            id={name}
            type="number"
            placeholder={placeholder}
            required
            className="pl-7 appearance-none w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-400 focus:border-orange-400"
          />
          <div className="absolute right-0 pr-3 flex items-center pointer-events-none">
            <span className="text-gray-500">원</span>
          </div>
        </div>
      ) : null}

      {kind === "phone" ? (
        <div className="flex rounded-md shadow-sm">
          <span className="flex items-center justify-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 select-none text-sm">
            +82
          </span>
          <input
            {...rest}
            id={name}
            type="number"
            required
            className="w-full appearance-none px-3 py-2 border border-gray-300 rounded-r-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500"
          />
        </div>
      ) : null}
    </div>
  );
}
