import UserBox from "@/components/UserBox";

interface CommentProps {
  comment: string;
  name: string;
  time: string;
  avatar?: string;
  key: number;
  userId: number;
}

export default function Comment({
  comment,
  name,
  time,
  avatar,
  userId,
}: CommentProps) {
  return (
    <div className="flex flex-col">
      <UserBox
        name={name}
        avatar={avatar}
        time={time}
        size="small"
        userId={userId}
      />
      <div className="flex items-start space-x-3">
        <div className="w-10"></div>
        <p className="text-gray-700">{comment}</p>
      </div>
    </div>
  );
}
