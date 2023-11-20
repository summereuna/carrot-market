interface UserProps {
  name?: string;
  avatar?: string;
  time?: string;
  size?: "large" | "small";
}

export default function UserBox({ name, avatar, time, size }: UserProps) {
  return (
    <div className="cursor-pointer flex space-x-3 items-center">
      {size === "large" ? (
        <>
          {avatar ? (
            <img
              src={avatar}
              alt="avatarPreview"
              className="w-14 h-14 rounded-full bg-slate-300"
            />
          ) : (
            <div className="w-16 h-16 bg-slate-300 rounded-full" />
          )}
          <div className="flex flex-col">
            <span className="font-medium text-gray-900">{name}</span>
            <span className="text-sm text-gray-700">프로필 수정 &rarr;</span>
          </div>
        </>
      ) : null}
      {size === "small" ? (
        <>
          <div className="w-10 h-10 rounded-full bg-slate-300" />
          <div className="flex flex-col">
            <span className="text-sm font-medium text-gray-700">{name}</span>
            <span className="text-xs font-medium text-gray-500">{time}</span>
          </div>
        </>
      ) : null}
    </div>
  );
}
