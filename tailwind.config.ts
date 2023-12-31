import type { Config } from "tailwindcss";

const config: Config = {
  //어디서 타일윈드 사용할지 알리기
  //페이지 폴더의 모든 폴더의 포든 파일의, 다음 확장자명에서...
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  darkMode: "media",
  // darkMode: "media" 환경 설정 따라 다크모드
  // darkMode: "class" 토글하면 다크모드
  plugins: [require("@tailwindcss/forms")], // @tailwindcss/forms: input에 reset layer 추가할 수 있는 plugin
};
export default config;
