import FloatingButton from "@/components/floating-button";
import Layout from "@/components/layout";
import type { NextPage } from "next";

const Live: NextPage = () => {
  return (
    <Layout title="라이브 스트리밍" hasTabBar>
      <div className="py-10 space-y-4 divide-y-2">
        {/*divide-y-2 요소 사이사이에 선 넣기 */}

        {/* 라이브 스트리밍 비디오 썸네일
      aspect-video 사용하면 16:9 비디오 비율에 맞게 높이 자동 조절 */}
        {[1, 1, 1, 1, 1].map((_, i) => (
          <div key={i} className="px-4 pt-4">
            <div className="w-full aspect-video rounded-md shadow-sm  bg-slate-300" />
            <h3 className="text-gray-700 text-lg mt-2">라이브스트림 제목</h3>
          </div>
        ))}

        <FloatingButton href="/live/create" text="라이브" />
      </div>
    </Layout>
  );
};

export default Live;
