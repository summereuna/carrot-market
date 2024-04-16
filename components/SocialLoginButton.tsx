import Link from "next/link";

interface SocialLoginButtonProps {
  title: string;
  api: string;
  logo: string;
}

export default function SocialLoginButton({
  title,
  api,
  logo,
}: SocialLoginButtonProps) {
  const handleSocialLoginClick = async () => {
    const res = await fetch(api);
    const data = await res.json();
    //새창에서 열지 말지 ㅇㅇ....
    return window.open(data.url, "_self", "noopener, noreferrer");
  };

  return (
    <button
      onClick={handleSocialLoginClick}
      className="space-x-2 w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
    >
      <svg
        className="w-5 h-5"
        aria-hidden="true"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path fillRule="evenodd" d={logo} clipRule="evenodd" />
      </svg>
      <span>{title}</span>
    </button>
  );
}
