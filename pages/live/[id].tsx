import type { NextPage } from "next";

const LiveDetail: NextPage = () => {
  return (
    <div className="py-10 px-4 space-y-4">
      {/* 라이브 스트리밍 동영상 */}
      <div className="w-full aspect-video rounded-md shadow-sm  bg-slate-300" />
      <div className="mt-5">
        <h1 className="text-gray-900 font-semibold text-3xl">
          라이브스트림 제목
        </h1>
        <span className="text-2xl block mt-3 text-gray-900">₩10,000</span>
        <p className=" my-6 text-gray-700">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda
          voluptatum error exercitationem voluptate hic neque recusandae unde
          quis modi pariatur, nesciunt illum consectetur tempora? Voluptatibus,
          ipsam. Veniam at obcaecati quaerat!
        </p>
      </div>

      {/* 채팅창: 보이는 화면 50에 고정*/}
      <h2 className="text-2xl font-semibold text-gray-900">라이브 채팅</h2>
      <div className="py-10 pb-16 h-[50vh] overflow-y-scroll px-4 space-y-3">
        {/*상대방*/}
        <div className="flex items-start space-x-2 w-[90%]">
          <div>
            <div className="w-8 h-8 rounded-full bg-slate-300" />
          </div>
          <div className="flex space-x-2 items-end">
            <div className="text-gray-700 bg-gray-200 rounded-xl p-3 text-sm">
              <p>
                올리신 글 보고 연락드려요. 혹시 에누리로 2만원에 구매
                가능한가요?
              </p>
            </div>
            <span className="text-xs text-gray-400">오후 12:45</span>
          </div>
        </div>
        {/*나: reverse 사용*/}
        <div className="flex justify-end">
          <div className="w-[90%] flex flex-row-reverse space-x-2 space-x-reverse items-end">
            <div className="bg-orange-500 text-yellow-50 rounded-xl p-3 text-sm">
              <p>안녕하세요 가능합니다~ 언제 가능하신가요?</p>
            </div>
            <span className="text-xs text-gray-400">오후 12:45</span>
          </div>
        </div>
        {/*상대방*/}
        <div className="flex space-x-2 w-[90%]">
          <div>
            <div className="w-8 h-8 rounded-full bg-slate-300" />
          </div>
          <div className="flex space-x-2 items-end">
            <div className="text-gray-700 bg-gray-200 rounded-xl p-3 text-sm">
              <p>오후 7시 이후 역 앞에서 가능하신가요?</p>
            </div>
            <span className="text-xs text-gray-400">오후 12:50</span>
          </div>
        </div>
        {/*상대방*/}
        <div className="flex space-x-2 w-[90%]">
          <div>
            <div className="w-8 h-8 rounded-full bg-slate-300" />
          </div>
          <div className="flex space-x-2 items-end">
            <div className="text-gray-700 bg-gray-200 rounded-xl p-3 text-sm">
              <p>오후 7시 이후 역 앞에서 가능하신가요?</p>
            </div>
            <span className="text-xs text-gray-400">오후 12:50</span>
          </div>
        </div>
        {/*상대방*/}
        <div className="flex space-x-2 w-[90%]">
          <div>
            <div className="w-8 h-8 rounded-full bg-slate-300" />
          </div>
          <div className="flex space-x-2 items-end">
            <div className="text-gray-700 bg-gray-200 rounded-xl p-3 text-sm">
              <p>오후 7시 이후 역 앞에서 가능하신가요?</p>
            </div>
            <span className="text-xs text-gray-400">오후 12:50</span>
          </div>
        </div>
        {/*상대방*/}
        <div className="flex space-x-2 w-[90%]">
          <div>
            <div className="w-8 h-8 rounded-full bg-slate-300" />
          </div>
          <div className="flex space-x-2 items-end">
            <div className="text-gray-700 bg-gray-200 rounded-xl p-3 text-sm">
              <p>오후 7시 이후 역 앞에서 가능하신가요?</p>
            </div>
            <span className="text-xs text-gray-400">오후 12:50</span>
          </div>
        </div>
        {/*상대방*/}
        <div className="flex space-x-2 w-[90%]">
          <div>
            <div className="w-8 h-8 rounded-full bg-slate-300" />
          </div>
          <div className="flex space-x-2 items-end">
            <div className="text-gray-700 bg-gray-200 rounded-xl p-3 text-sm">
              <p>오후 7시 이후 역 앞에서 가능하신가요?</p>
            </div>
            <span className="text-xs text-gray-400">오후 12:50</span>
          </div>
        </div>
        {/*상대방*/}
        <div className="flex space-x-2 w-[90%]">
          <div>
            <div className="w-8 h-8 rounded-full bg-slate-300" />
          </div>
          <div className="flex space-x-2 items-end">
            <div className="text-gray-700 bg-gray-200 rounded-xl p-3 text-sm">
              <p>오후 7시 이후 역 앞에서 가능하신가요?</p>
            </div>
            <span className="text-xs text-gray-400">오후 12:50</span>
          </div>
        </div>
        {/*상대방*/}
        <div className="flex space-x-2 w-[90%]">
          <div>
            <div className="w-8 h-8 rounded-full bg-slate-300" />
          </div>
          <div className="flex space-x-2 items-end">
            <div className="text-gray-700 bg-gray-200 rounded-xl p-3 text-sm">
              <p>오후 7시 이후 역 앞에서 가능하신가요?</p>
            </div>
            <span className="text-xs text-gray-400">오후 12:50</span>
          </div>
        </div>
        {/*상대방*/}
        <div className="flex space-x-2 w-[90%]">
          <div>
            <div className="w-8 h-8 rounded-full bg-slate-300" />
          </div>
          <div className="flex space-x-2 items-end">
            <div className="text-gray-700 bg-gray-200 rounded-xl p-3 text-sm">
              <p>오후 7시 이후 역 앞에서 가능하신가요?</p>
            </div>
            <span className="text-xs text-gray-400">오후 12:50</span>
          </div>
        </div>
        {/*상대방*/}
        <div className="flex space-x-2 w-[90%]">
          <div>
            <div className="w-8 h-8 rounded-full bg-slate-300" />
          </div>
          <div className="flex space-x-2 items-end">
            <div className="text-gray-700 bg-gray-200 rounded-xl p-3 text-sm">
              <p>오후 7시 이후 역 앞에서 가능하신가요?</p>
            </div>
            <span className="text-xs text-gray-400">오후 12:50</span>
          </div>
        </div>
        {/*상대방*/}
        <div className="flex space-x-2 w-[90%]">
          <div>
            <div className="w-8 h-8 rounded-full bg-slate-300" />
          </div>
          <div className="flex space-x-2 items-end">
            <div className="text-gray-700 bg-gray-200 rounded-xl p-3 text-sm">
              <p>오후 7시 이후 역 앞에서 가능하신가요?</p>
            </div>
            <span className="text-xs text-gray-400">오후 12:50</span>
          </div>
        </div>
        {/*플로팅 채팅창 고정*/}
        <div className="bg-white fixed bottom-0 p-2 inset-x-0">
          <div className="relative flex max-w-md items-center w-full mx-auto">
            <input
              type="text"
              className="pr-12 shadow-sm rounded-full w-full border-gray-300 focus:outline-none focus:border-orange-500 focus:ring-orange-500"
            />
            <div className="absolute inset-y-0 flex py-1.5 pr-1.5 right-0">
              <button className="flex items-center bg-orange-500 rounded-full px-3 hover:bg-orange-600 focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 text-sm text-white">
                &rarr;
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveDetail;
