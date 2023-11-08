import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { SWRConfig } from "swr";
//SWRConfig: 모든 페이지에 적용되어 fetcher의 기본 값 지정할 수 있고, 글로벌 옵션도 지정가능한 프로바이더

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SWRConfig
      value={{
        fetcher: (url: string) =>
          fetch(url).then((response) => response.json()),
      }}
    >
      <div className="w-full max-w-xl mx-auto">
        {/*
      max-w-lg: 일단 모바일 온리로 하기 위해 화면 최대 크기 설정
      나중에 반응형으로 바꾸자
      mx-auto: with 설정하고 양옆 마진 auto로 주면 중앙정렬 */}
        <Component {...pageProps} />
      </div>
    </SWRConfig>
  );
}
