import type { NextPage } from "next";

const Create: NextPage = () => {
  return (
    <div className="px-4 py-10 space-y-5">
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
      <button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500">
        라이브 시작하기
      </button>
    </div>
  );
};

export default Create;
