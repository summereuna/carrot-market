import Image from "next/image";

interface CommentProps {
  comment: string;
  name?: string;
  time?: string;
  avatar?: string;
  key?: number;
}

export default function Comment({ comment, name, time, avatar }: CommentProps) {
  return (
    <div className="flex items-start space-x-3">
      <div>
        {avatar ? (
          <Image
            src={avatar}
            alt="avatar"
            width={40}
            height={40}
            className="w-8 h-8 rounded-full bg-slate-300 object-cover"
          />
        ) : (
          <div className="w-8 h-8 rounded-full bg-slate-300" />
        )}
      </div>
      <div>
        <span className="text-sm block font-medium text-gray-700">{name}</span>
        <span className="text-xs block text-gray-500">{time}</span>
        <p className="text-gray-700">{comment}</p>
      </div>
    </div>
  );
}
