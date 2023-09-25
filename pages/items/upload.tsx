import Button from "@/components/button";
import type { NextPage } from "next";

const Upload: NextPage = () => {
  return (
    <div className="px-4 py-16 space-y-5">
      <div>
        <div>
          <label className="flex items-center justify-center text-gray-600 hover:text-orange-500 border-2 border-dashed border-gray-300 w-full h-48 rounded-md mb-8 cursor-pointer hover:border-orange-500">
            <svg
              className="h-12 w-12"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 48 48"
              aria-hidden="true"
            >
              <path
                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            {/* label안에 input 넣고 hidden 하면 label 클릭 시 파일 선택 가능 */}
            <input type="file" className="hidden" />
          </label>
        </div>
      </div>
      <div>
        <label
          htmlFor="name"
          className="mb-1 block text-sm font-semibold text-gray-700"
        >
          제목
        </label>
        <div className="relative rounded-md shadow-sm flex items-center">
          <input
            id="name"
            type="text"
            placeholder="제목"
            className="appearance-none  w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-400 focus:border-orange-400
                "
          />
        </div>
      </div>
      <div>
        <label
          htmlFor="price"
          className="mb-1 block text-sm font-semibold text-gray-700"
        >
          가격
        </label>
        <div className="relative rounded-md shadow-sm flex items-center">
          <div className="absolute left-0 pl-3 flex items-center justify-center">
            <span className="text-gray-500 text-sm pointer-events-none">₩</span>
          </div>
          <input
            id="price"
            type="number"
            placeholder="가격을 입력해주세요.&#10;"
            className="appearance-none pl-7 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-400 focus:border-orange-400
                "
          />
          <div className="absolute right-0 pr-3 flex items-center pointer-events-none">
            <span className="text-gray-500">원</span>
          </div>
        </div>
      </div>
      <div>
        <label
          htmlFor="description"
          className="mb-1 block text-sm font-semibold text-gray-700"
        >
          자세한 설명
        </label>
        <div>
          <textarea
            id="description"
            rows={4}
            placeholder="올릴 게시글 내용을 작성해 주세요.&#10;(판매 금지 물품은 게시가 제한될 수 있어요.)&#10;신뢰할수 있는 거래를 위해 자세히 적어주세요."
            className="mt-1 shadow-sm w-full placeholder-gray-400  border-gray-300 focus:outline-none focus:ring-orange-400 focus:border-orange-400 rounded-md "
          />
        </div>
      </div>
      <Button text="작성완료" />
    </div>
  );
};

export default Upload;
