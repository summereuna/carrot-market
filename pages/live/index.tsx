import type { NextPage } from "next";

const Live: NextPage = () => {
  return (
    <div className="py-10 space-y-4 divide-y-2">
      {/*divide-y-2 요소 사이사이에 선 넣기 */}

      {/* 라이브 스트리밍 비디오 썸네일
      aspect-video 사용하면 16:9 비디오 비율에 맞게 높이 자동 조절 */}
      {[1, 1, 1, 1, 1].map((_, i) => (
        <div key={i} className="px-4 pt-4">
          <div className="w-full aspect-video rounded-md shadow-sm  bg-slate-300" />
          <h3 className="text-gray-700 text-lg mt-2">라이브스트림 제목</h3>
        </div>
      ))}

      <button className="flex fixed bottom-24 right-5 bg-orange-400 rounded-full p-4 text-white shadow-xl transition-colors hover:bg-orange-500 cursor-pointer border-transparent">
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
            d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z"
          />
        </svg>
      </button>
    </div>
  );
};

export default Live;
