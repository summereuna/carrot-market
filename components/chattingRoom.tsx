import { getTimeInterval } from "@/libs/client/utils";
import Image from "next/image";
import Link from "next/link";

interface ChattingRoomProps {
  key: number;
  roomId: number;
  updated: Date;
  otherUserName: string;
  otherUserAvatarUrl?: string;
  lastChat?: string;
}

export default function ChattingRoom({
  roomId,
  updated,
  otherUserName,
  otherUserAvatarUrl,
  lastChat,
}: ChattingRoomProps) {
  return (
    <Link href={`/chats/${roomId}`}>
      <div className="cursor-pointer px-4 py-3 flex space-x-3 items-center">
        <div className="flex-shrink-0">
          {otherUserAvatarUrl ? (
            <Image
              src={otherUserAvatarUrl}
              alt="avatar-preview"
              width={40}
              height={40}
              className="w-12 h-12 rounded-full bg-slate-300 object-cover"
              priority
            />
          ) : (
            <div className="w-12 h-12 rounded-full bg-slate-300" />
          )}
        </div>
        <div className="flex flex-col">
          <div className="space-x-2">
            <span className="font-medium text-gray-700">{otherUserName}</span>
            <span className="text-xs text-gray-500">
              {getTimeInterval(updated)}
            </span>
          </div>
          <span className="text-sm text-gray-500">{lastChat}</span>
        </div>
      </div>
    </Link>
  );
}
