import type { NextPage } from "next";
const Home: NextPage = () => {
  const toggleDarkmode = () => {};
  return (
    <div className="bg-slate-400 py-20 px-20 grid gap-10 lg:grid-cols-2 xl:grid-cols-3 min-h-screen xl:place-content-center">
      {/* 첫 번째: 계산서 */}
      <div className="bg-white dark:bg-black p-10 rounded-3xl shadow-xl">
        <span className="font-semibold dark:text-white text-3xl">
          Select Item
        </span>
        <div className="my-3 flex-col space-y-3">
          <div className="flex justify-between">
            <span className="text-gray-500 dark:text-gray-300">Grey Chair</span>
            <span className="font-semibold dark:text-white">$19</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500 dark:text-gray-300">
              Tooly Table
            </span>
            <span className="font-semibold dark:text-white">$19</span>
          </div>
        </div>
        <div className="flex justify-between pt-2 border-t-2 border-dashed">
          <span>Total</span>
          <span className="font-semibold dark:text-white">$19</span>
        </div>
        <button className="mt-5 bg-blue-500 dark:bg-black dark:border dark:border-white text-white p-3 text-center rounded-xl w-1/2 mx-auto block hover:bg-teal-500 dark:hover:bg-white dark:hover:text-black active:bg-yellow-400 transition">
          Checkout
        </button>
      </div>
      {/* 두 번째: 프로필*/}
      <div className="bg-white dark:bg-black rounded-2xl shadow-xl overflow-hidden group">
        <div className="bg-blue-500 p-6 pb-14 xl:pb-40 flex justify-between text-2xl">
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
      <div className="bg-white dark:bg-black p-10 rounded-2xl shadow-xl lg:col-span-2 xl:col-span-1">
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
      # 다크모드
      1. 컴퓨터 설정 따라서
      tailwind css의 다크모드 쿼리는 기본값으로 브라우저의 설정을 따라간다.
      ## 다크모드 사용하기: dark: 모디파이어 사용하기
      - dark: @media (prefers-color-scheme: dark) {}
      
      2. 직접 토글
      다크모드를 설정할 수 있는 버튼을 가진 웹사이트들은 브라우저 설정을 따라가지 않는다.
      이 기능을 사용하려면 tailwind.config.js에서 
      - 이렇게 media 쿼리가 빠진걸 알수 있음
      :is(.dark .dark\:bg-black) {}
       ## 다크모드 사용하기: dark모드 적용할 부분에 dark: 모디파이어로 작성 후, 부모 요소에 dark 클래스 넣어 활성화 시키기
       따라서 유저가 버튼 클릭시 최상위 컴포넌트(root 컴포넌트)에 dark 클래스 추가하는 방법으로 토글 버튼 만들면 된다.
  */}
    </div>
  );
};

export default Home;
