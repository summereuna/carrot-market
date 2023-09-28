interface CommentProps {
  comment: string;
  name?: string;
  time?: string;
}

export default function Comment({ comment, name, time }: CommentProps) {
  return (
    <div className="flex items-start space-x-3">
      <div>
        <div className="w-8 h-8 rounded-full bg-slate-300" />
      </div>
      <div>
        <span className="text-sm block font-medium text-gray-700">{name}</span>
        <span className="text-xs block text-gray-500">{time}</span>
        <p className="text-gray-700">{comment}</p>
      </div>
    </div>
  );
}
