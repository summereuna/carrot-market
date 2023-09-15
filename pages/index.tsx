import type { NextPage } from "next";
const Home: NextPage = () => {
  return (
    <>
      <div className="bg-slate-400 py-20 px-20 grid gap-10 min-h-screen">
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
          <button className="mt-5 bg-blue-500 text-white p-3 text-center rounded-xl w-1/2 mx-auto block hover:bg-teal-500 active:bg-yellow-400 focus:text-blue-800">
            Checkout
          </button>
        </div>
        {/* 두 번째: 프로필*/}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden group">
          <div className="bg-blue-500 p-6 pb-14 flex justify-between text-2xl">
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
        <div className="bg-white p-10 rounded-2xl shadow-xl">
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
        {/* 네 번째: 폼*/}
        <div className="bg-white p-10 rounded-2xl shadow-xl">
          <div>
            <h4 className="font-semibold text-2xl mb-5">
              Modifiers for Form: 일반적인 css랑 비슷
            </h4>
            <form className="flex flex-col space-y-2 bg-blue-500 p-5 focus-within:bg-blue-100">
              <input
                type="text"
                required
                placeholder="User Name"
                className="required:border-2 border-yellow-400 invalid:bg-red-300 valid:bg-teal-300"
              />
              <input
                type="password"
                required
                placeholder="Password"
                className="placeholder-shown:bg-teal-500 placeholder:text-white"
              />
              <input type="submit" value="login" className="bg-white" />
            </form>
          </div>
          <div className="mt-10 flex flex-col">
            <span className="font-semibold text-2xl">⭐️ Peer Modifier</span>
            <span className="text-s text-gray-500">
              Peer Modifier를 사용하면 폼에서 많이 쓰는 패턴을 쉽게 구현할 수
              있다.
            </span>
            <span className="text-xs text-gray-500">
              예) 이 <b>input의 상태(state)</b>에 따라 경고 span의 스타일을
              변경할 수 있다.
            </span>
            <p>1. peer를 label해 주기</p>
            <p>2. peer 상태에 따른 스타일 변경 주기</p>
            <form className="flex flex-col space-y-2 p-5">
              <input
                type="text"
                required
                placeholder="Username"
                className="peer p-1 border border-gray-400 rounded"
              />
              <span className="hidden peer-invalid:block peer-invalid:text-red-500">
                This input is invalid!
              </span>
              <span className="hidden peer-valid:block peer-valid:text-teal-500">
                Awesome username!
              </span>
              <span className="hidden peer-hover:block peer-hover:text-amber-500">
                Checkkkk!
              </span>
              <input type="submit" value="Login" className="bg-white" />
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
