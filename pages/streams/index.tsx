import FloatingButton from "@/components/floating-button";
import Layout from "@/components/layout";
import { Stream } from "@prisma/client";
import type { NextPage } from "next";
import Link from "next/link";
import useSWR from "swr";

interface StreamsResponse {
  ok: boolean;
  streams: Stream[];
}
const Streams: NextPage = () => {
  const { data } = useSWR<StreamsResponse>(`/api/streams`);

  return (
    <Layout title="라이브 스트리밍" hasTabBar>
      <div className="space-y-4 divide-y-[1px]">
        {/*divide-y-2 요소 사이사이에 선 넣기 */}

        {/* 라이브 스트리밍 비디오 썸네일
      aspect-video 사용하면 16:9 비디오 비율에 맞게 높이 자동 조절 */}
        {data?.streams.map((stream) => (
          <div className="px-4 pt-4" key={stream.id}>
            <Link href={`/streams/${stream.id}`}>
              <div className="w-full aspect-video rounded-md shadow-sm  bg-slate-300" />
              <h3 className="text-gray-700 text-lg mt-2">{stream.name}</h3>
            </Link>
          </div>
        ))}

        <FloatingButton href="/streams/create" text="라이브" />
      </div>
    </Layout>
  );
};

export default Streams;
