import Image from "next/image";

interface MessageProps {
  message: string;
  time: string;
  me?: boolean;
  avatarUrl?: string;
}

export default function Message({
  message,
  time,
  me,
  avatarUrl,
}: MessageProps) {
  return (
    <>
      {!me ? (
        <div className="flex items-start space-x-2 w-[90%]">
          <div>
            {avatarUrl ? (
              <Image
                src={avatarUrl}
                alt="avatar-preview"
                width={40}
                height={40}
                className="w-8 h-8 rounded-full bg-slate-300 object-cover"
              />
            ) : (
              <div className="w-8 h-8 rounded-full bg-slate-300" />
            )}
          </div>
          <div className="flex space-x-2 items-end">
            <div className="text-gray-700 bg-gray-200 rounded-xl p-3 text-sm">
              <p>{message}</p>
            </div>
            <span className="text-xs text-gray-400">{time}</span>
          </div>
        </div>
      ) : (
        <div className="flex justify-end">
          <div className="w-[90%] flex flex-row-reverse space-x-2 space-x-reverse items-end">
            <div className="bg-orange-500 text-yellow-50 rounded-xl p-3 text-sm">
              <p>{message}</p>
            </div>
            <span className="text-xs text-gray-400">{time}</span>
          </div>
        </div>
      )}
    </>
  );
}
