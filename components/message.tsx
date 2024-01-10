import { getMessageTime } from "@/libs/client/utils";
import Image from "next/image";

interface MessageProps {
  message: string;
  time: string;
  me?: boolean;
  avatarUrl?: string;
  isReservedAlarm: boolean;
}

export default function Message({
  message,
  time,
  me,
  avatarUrl,
  isReservedAlarm,
}: MessageProps) {
  return (
    <>
      {!me && !isReservedAlarm && (
        <div className="flex items-start space-x-2 w-[90%]">
          <div className="flex-shrink-0">
            {avatarUrl ? (
              <Image
                src={avatarUrl}
                alt="avatar-preview"
                width={40}
                height={40}
                className="w-8 h-8 rounded-full bg-slate-300 object-cover"
              />
            ) : (
              <div className="w-8 h-8 rounded-full bg-slate-300 flex-shrink-0" />
            )}
          </div>
          <div className="flex space-x-2 items-end">
            <div className="text-gray-700 bg-gray-100 rounded-xl p-3 text-sm text-left">
              <p>{message}</p>
            </div>
            <span className="text-xs text-gray-400 text-left flex-shrink-0">
              {getMessageTime(time)}
            </span>
          </div>
        </div>
      )}
      {me && !isReservedAlarm && (
        <div className="flex justify-end">
          <div className="w-[90%] flex flex-row-reverse space-x-2 space-x-reverse items-end">
            <div className="bg-orange-500 text-yellow-50 rounded-xl p-3 text-sm text-left">
              <p>{message}</p>
            </div>
            <span className="text-xs text-gray-400 text-right flex-shrink-0">
              {getMessageTime(time)}
            </span>
          </div>
        </div>
      )}
      {isReservedAlarm && (
        <div className="py-3 flex bg-sky-100 mx-16 rounded-xl">
          <span className="text-sm text-sky-700 px-10">{message}</span>
        </div>
      )}
    </>
  );
}
