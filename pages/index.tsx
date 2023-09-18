import type { NextPage } from "next";
const Home: NextPage = () => {
  return (
    <div className="flex flex-col space-y-10 p-5">
      <div>
        <h2 className="font-semibold text-lg">✅ details 태그</h2>
        <details className="select-none open:text-white open:bg-red-400">
          <summary className="cursor-pointer">
            디테일 태그의 제목 쓰는 부분: 그냥 html임
          </summary>
          <span>컨텐츠츠츠</span>
        </details>
      </div>

      <div>
        <h2 className="font-semibold text-lg">
          ✅ 유저가 글자 선택했을 때 색 변경 selection:bg-indigo-500
        </h2>
        <span className="selection:bg-indigo-500 selection:text-white">
          유저가 글자 선택했을 때 색 변경
        </span>
      </div>

      <div>
        <h2 className="font-semibold text-lg">✅ ul - li</h2>
        <ul className="list-decimal marker:text-teal-500">
          <li>hi~</li>
          <li>hi~</li>
          <li>hi~</li>
        </ul>
      </div>

      <div>
        <h2 className="font-semibold text-lg">
          ✅ file selector and modifier file:border-0{" "}
        </h2>
        <input
          type="file"
          className="file:border-0 file:rounded-xl file:bg-purple-600 file:px-3 file:py-2 file:text-white bg-purple-200 rounded-xl"
        />
      </div>

      <div>
        <h2 className="font-semibold text-lg">
          ✅ 여러 modifier 중첩(stack)시키기 file:hover:bg-white
        </h2>
        <input
          type="file"
          className="file:cursor-pointer file:hover:text-purple-600 file:hover:bg-white file:hover:border-purple-400 file:hover:border file:transition-colors file:border-0 file:rounded-xl file:bg-purple-600 file:px-3 file:py-2 file:text-white bg-purple-200 rounded-xl"
        />
      </div>

      <div>
        <h2 className="font-semibold text-lg">
          ✅ 문장 첫 글자 크게 first-letter:text-6xl / first-line:bg-yellow-300
        </h2>
        <p className="first-letter:text-6xl font-serif first-letter:hover:text-indigo-300 hover:first-line:bg-yellow-300">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptates
          animi quae placeat soluta iusto autem. Autem distinctio dolorum ea
          voluptate velit dolore cupiditate officiis fugit laudantium?
          Exercitationem id voluptates mollitia.
        </p>
      </div>
    </div>
  );
};

export default Home;
