import type { NextPage } from "next";
const Home: NextPage = () => {
  return (
    <div className="bg-slate-400 py-20 px-20 grid gap-10 lg:grid-cols-2 xl:grid-cols-3 min-h-screen xl:place-content-center">
      {/* 첫 번째: 계산서 */}
      <div className="bg-white p-10 rounded-3xl shadow-xl">
        <span className="font-semibold text-3xl">Select Item</span>
        <div className="my-3 flex-col space-y-3">
          <div className="flex justify-between">
            <span className="text-gray-500">Grey Chair</span>
            <span className="font-semibold">$19</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Tooly Table</span>
            <span className="font-semibold">$19</span>
          </div>
        </div>
        <div className="flex justify-between pt-2 border-t-2 border-dashed">
          <span>Total</span>
          <span className="font-semibold">$19</span>
        </div>
        <button className="mt-5 bg-blue-500 text-white p-3 text-center rounded-xl w-1/2 mx-auto block hover:bg-teal-500 active:bg-yellow-400 focus:text-blue-800 transition">
          Checkout
        </button>
      </div>
      {/* 두 번째: 프로필*/}
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden group">
        <div className="portrait:bg-blue-500 landscape:bg-teal-500 p-6 pb-14 xl:pb-40 flex justify-between text-2xl">
          <span className="text-white font-semibold">Profile</span>
        </div>
        <div className="rounded-3xl p-6 relative -top-5 bg-white">
          <div className="flex relative -top-16 items-end justify-between">
            <div className="flex flex-col items-center">
              <span className="text-sm text-gray-500">Order</span>
              <span className="font-medium">613</span>
            </div>
            <div className="h-24 w-24 bg-gray-300 rounded-full group-hover:bg-yellow-400 transition" />
            <div className="flex flex-col items-center">
              <span className="text-sm text-gray-500">Spent</span>
              <span className="font-medium">$2013</span>
            </div>
          </div>
          <div className="relative flex flex-col items-center -mt-10 ">
            <span className="text-lg font-medium">Eunhwa Jung</span>
            <span className="text-sm text-gray-500">Daegu, Korea</span>
          </div>
        </div>
      </div>
      {/* 세 번째: 제품 화면 */}
      <div className="bg-white p-10 rounded-2xl shadow-xl lg:col-span-2 xl:col-span-1">
        <div className="flex justify-between items-center mb-3">
          <span>⬅️</span>
          <div className="space-x-3">
            <span>⭐️ 4.7</span>
            <span className="shadow-xl px-1 py-0.5 rounded-md text-red-500 border">
              ♥️
            </span>
          </div>
        </div>
        <div className="bg-zinc-400 h-72 mb-5"></div>
        <div className="flex flex-col">
          <span className="font-medium text-lg">Swoon Lounge</span>
          <span className="text-xs text-gray-500">Chair</span>
          <div className="mt-3 mb-5 flex justify-between items-center">
            <div className="space-x-2">
              <button
                id="btn-yellow"
                className="w-4 h-4 rounded-full bg-yellow-400 focus:ring-2 ring-offset-2 ring-yellow-200 transition"
              ></button>
              <button
                id="btn-indigo"
                className="w-4 h-4 rounded-full bg-indigo-400 focus:ring-2 ring-offset-2 ring-indigo-200 transition"
              ></button>
              <button
                id="btn-teal"
                className="w-4 h-4 rounded-full bg-teal-400 focus:ring-2 ring-offset-2 ring-teal-200 transition"
              ></button>
            </div>
            <div className="flex items-center space-x-5">
              <button className="rounded-lg p-0.8 bg-blue-200 flex justify-center items-center w-8 aspect-square text-xl text-gray-500">
                -
              </button>
              <span>1</span>
              <button className="rounded-lg p-0.8 bg-blue-200 flex justify-center items-center w-8 aspect-square text-xl text-gray-500">
                +
              </button>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-medium text-2xl">$450</span>
            <button className="bg-blue-500 text-center text-white rounded-lg px-5 py-2 text-sm">
              Add to cart
            </button>
          </div>
        </div>
      </div>
      {/*
      # 반응형 modifier
        반응형을 만들 때, 사람들은 보통 먼저 데스크탑 버전 부터 생각한 후 그걸 모바일 버전에 적용시킴
        tailwind는 모든 클래스가 모바일에 우선 적용된다.
        그러고 나서 큰 화면을 위해 디자인을 변경해야 한다.
        - sm: @media (min-width: 640px) {}
        - md: @media (min-width: 768px) {}
        - lg: @media (min-width: 1024px) {}
        - xl: @media (min-width: 1280px) {}
        - 2xl: @media (min-width: 1536px) {}

        # 디바이스 방향(가로/세로)에 따라 바꾸기
        - 디바이스가 가로 방향일 때
        landscape: @media (orientation: landscape) {}
        
        - 디바이스가 세로 방향일 때 (원래 디폴트값이긴 함)
        portrait: @media (orientation: portrait) {}
  */}
    </div>
  );
};

export default Home;
