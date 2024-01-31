import { cls } from "@/libs/client/utils";

interface MannerProps {
  degree: number;
}

export default function Manner({ degree }: MannerProps) {
  const getUserDegree = (degree: number) => {
    if (degree < 0) {
      return 0;
    } else if (degree > 100) {
      return 100;
    } else if (0 < degree && degree < 100) {
      return degree;
    }
  };

  return (
    <div className="flex flex-col space-y-2 pb-3">
      <div className="flex justify-end">
        <div className="flex space-x-3">
          <span
            className={cls(
              "text-xl font-semibold",
              degree < 36.5 ? "text-gray-400" : "",
              36.5 <= degree && degree < 65.5 ? "text-sky-400" : "",
              65.5 <= degree ? "text-orange-400" : ""
            )}
          >
            {getUserDegree(degree)}℃
          </span>
          <div className="flex items-center justify-center rounded-full bg-yellow-200">
            {degree < 36.5 && (
              <svg
                id="bad"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                className="w-7 h-7"
              >
                <path
                  id="bad"
                  d="M464 256A208 208 0 1 1 48 256a208 208 0 1 1 416 0zM256 0a256 256 0 1 0 0 512A256 256 0 1 0 256 0zM176.4 240a32 32 0 1 0 0-64 32 32 0 1 0 0 64zm192-32a32 32 0 1 0 -64 0 32 32 0 1 0 64 0zM184 328c-13.3 0-24 10.7-24 24s10.7 24 24 24H328c13.3 0 24-10.7 24-24s-10.7-24-24-24H184z"
                />
              </svg>
            )}
            {36.5 <= degree && degree < 65.5 && (
              <svg
                id="good"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                className="w-7 h-w-7"
              >
                <path
                  id="good"
                  d="M464 256A208 208 0 1 0 48 256a208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm177.6 62.1C192.8 334.5 218.8 352 256 352s63.2-17.5 78.4-33.9c9-9.7 24.2-10.4 33.9-1.4s10.4 24.2 1.4 33.9c-22 23.8-60 49.4-113.6 49.4s-91.7-25.5-113.6-49.4c-9-9.7-8.4-24.9 1.4-33.9s24.9-8.4 33.9 1.4zM144.4 208a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zm192-32a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"
                />
              </svg>
            )}
            {65.5 <= degree && (
              <svg
                id="best"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                className="w-7 h-7"
              >
                <path
                  id="best"
                  d="M338.9 446.8c-25.4 11-53.4 17.2-82.9 17.2C141.1 464 48 370.9 48 256S141.1 48 256 48s208 93.1 208 208c0 22.4-3.5 43.9-10.1 64.1c3.1 4.5 5.7 9.4 7.8 14.6c12.7-1.6 25.1 .4 36.2 5c9.1-26.2 14-54.4 14-83.7C512 114.6 397.4 0 256 0S0 114.6 0 256S114.6 512 256 512c35.4 0 69.1-7.2 99.7-20.2c-4.8-5.5-8.5-12.2-10.4-19.7l-6.5-25.3zM296 316c0-6.9-3.1-13.2-7.3-18.3c-4.3-5.2-10.1-9.7-16.7-13.4C258.7 276.9 241.4 272 224 272c-3.6 0-6.8 2.5-7.7 6s.6 7.2 3.8 9l0 0 0 0 0 0 .2 .1c.2 .1 .5 .3 .9 .5c.8 .5 2 1.2 3.4 2.1c2.8 1.9 6.5 4.5 10.2 7.6c3.7 3.1 7.2 6.6 9.6 10.1c2.5 3.5 3.5 6.4 3.5 8.6s-1 5-3.5 8.6c-2.5 3.5-5.9 6.9-9.6 10.1c-3.7 3.1-7.4 5.7-10.2 7.6c-1.4 .9-2.6 1.6-3.4 2.1c-.4 .2-.7 .4-.9 .5l-.2 .1 0 0 0 0 0 0 0 0 0 0c-2.5 1.4-4.1 4.1-4.1 7s1.6 5.6 4.1 7l0 0 0 0 0 0 .2 .1c.2 .1 .5 .3 .9 .5c.8 .5 2 1.2 3.4 2.1c2.8 1.9 6.5 4.5 10.2 7.6c3.7 3.1 7.2 6.6 9.6 10.1c2.5 3.5 3.5 6.4 3.5 8.6s-1 5-3.5 8.6c-2.5 3.5-5.9 6.9-9.6 10.1c-3.7 3.1-7.4 5.7-10.2 7.6c-1.4 .9-2.6 1.6-3.4 2.1c-.4 .2-.7 .4-.9 .5l-.2 .1 0 0 0 0 0 0 0 0c-3.2 1.8-4.7 5.5-3.8 9s4.1 6 7.7 6c17.4 0 34.7-4.9 47.9-12.3c6.6-3.7 12.5-8.2 16.7-13.4c4.3-5.1 7.3-11.4 7.3-18.3s-3.1-13.2-7.3-18.3c-4.3-5.2-10.1-9.7-16.7-13.4c-2.7-1.5-5.7-3-8.7-4.3c3.1-1.3 6-2.7 8.7-4.3c6.6-3.7 12.5-8.2 16.7-13.4c4.3-5.1 7.3-11.4 7.3-18.3zM176.4 240a32 32 0 1 0 0-64 32 32 0 1 0 0 64zm159.3-20c10.6 0 19.9 3.8 25.4 9.7c7.6 8.1 20.2 8.5 28.3 .9s8.5-20.2 .9-28.3C375.7 186.8 355 180 335.6 180s-40.1 6.8-54.6 22.3c-7.6 8.1-7.1 20.7 .9 28.3s20.7 7.1 28.3-.9c5.5-5.8 14.8-9.7 25.4-9.7zM434 352.3c-6-23.2-28.8-37-51.1-30.8s-35.4 30.1-29.5 53.4l22.9 89.3c2.2 8.7 11.2 13.9 19.8 11.4l84.9-23.8c22.2-6.2 35.4-30.1 29.5-53.4s-28.8-37-51.1-30.8l-20.2 5.6-5.4-21z"
                />
              </svg>
            )}
          </div>
        </div>
      </div>
      <div className="w-full">
        <div className="relative flex justify-end w-[36.5%] items-end">
          <div className="absolute right-[-42px] bottom-[-5px] flex flex-col items-center space-y-1">
            <span className="text-sm text-gray-400">첫 온도 36.5℃</span>
            <div className="w-0 h-0 border-l-[0.3rem] border-l-transparent border-t-[0.45rem] border-t-gray-400 border-r-[0.3rem] border-r-transparent"></div>
          </div>
        </div>
      </div>
      <progress
        className={cls(
          "h-3 w-full",
          degree < 36.5 ? "bad" : "",
          65.5 <= degree ? "best" : ""
        )}
        value={degree}
        max="100"
      ></progress>
    </div>
  );
}
