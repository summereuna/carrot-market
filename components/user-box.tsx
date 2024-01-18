import useUser from "@/libs/client/useUser";
import { getTimeInterval } from "@/libs/client/utils";
import Image from "next/image";
import Link from "next/link";

interface UserProps {
  name: string;
  avatar?: string;
  time: string;
  size: "large" | "small";
  isMe?: boolean;
  userId?: number;
}

export default function UserBox({
  name,
  avatar,
  time,
  size,
  isMe,
  userId,
}: UserProps) {
  return (
    <div className="cursor-pointer flex space-x-3 items-center">
      {size === "small" ? (
        <Link href={`/profile/${userId}`}>
          <div className="flex items-start space-x-3 cursor-pointer">
            {avatar ? (
              <Image
                src={avatar}
                alt="avatar-preview"
                width={40}
                height={40}
                className="w-10 h-10 rounded-full bg-slate-300 object-cover"
              />
            ) : (
              <div className="w-10 h-10 bg-slate-300 rounded-full" />
            )}
            <div className="flex flex-col">
              <span className="text-sm font-medium text-gray-700">{name}</span>
              <span className="text-xs font-medium text-gray-500">
                {getTimeInterval(time)}
              </span>
            </div>
          </div>
        </Link>
      ) : null}
      {size === "large" ? (
        <>
          {avatar ? (
            <Image
              src={avatar}
              alt="avatar-preview"
              width={40}
              height={40}
              className="w-14 h-14 rounded-full bg-slate-300 object-cover"
            />
          ) : (
            <div className="w-14 h-14 bg-slate-300 rounded-full" />
          )}
          <div className="flex flex-col">
            <span className="font-medium text-gray-900">{name}</span>
            {isMe ? (
              <span className="text-sm text-gray-700">프로필 수정 &rarr;</span>
            ) : null}
          </div>
        </>
      ) : null}
    </div>
  );
}
