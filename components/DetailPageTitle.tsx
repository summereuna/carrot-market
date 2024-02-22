interface DetailPageProps {
  title: string;
  url: string;
  hasDetailPage?: boolean;
}

import { useRouter } from "next/router";

export default function DetailPageTitle({
  title,
  url,
  hasDetailPage = true,
}: DetailPageProps) {
  const router = useRouter();

  const onDetailPage = () => {
    router.push(`${url}`);
  };

  return (
    <div className="flex justify-between px-4 py-3">
      <h2 className="font-semibold">{title}</h2>
      {hasDetailPage ? (
        <button onClick={onDetailPage}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m8.25 4.5 7.5 7.5-7.5 7.5"
            />
          </svg>
        </button>
      ) : null}
    </div>
  );
}
