import FloatingButton from "@/components/FloatingButton";
import Layout from "@/components/Layout";
import { Stream } from "@prisma/client";
import type { NextPage } from "next";
import Link from "next/link";
import { useState } from "react";
import useSWR from "swr";

interface StreamsResponse {
  ok: boolean;
  streams: Stream[];
}
const Streams: NextPage = () => {
  const [pageIndex, setPageIndex] = useState(1);
  const [pageLimit, setPageLimit] = useState(6);
  const numPages = 2; //원래는 Math.ceil(total / limit) 으로 구해야 하지만 total 알수가 없음..
  const { data } = useSWR<StreamsResponse>(
    `/api/streams?page=${pageIndex}&limit=${pageLimit}`
  );

  console.log(data);
  const onPreBtn = () => {
    setPageIndex((prev) => prev - 1);
  };
  const onNextBtn = () => {
    setPageIndex((prev) => prev + 1);
  };
  return (
    <Layout title="라이브 스트리밍" hasTabBar>
      <div className="grid grid-cols-2 pt-3 pb-3">
        {/*divide-y-2 요소 사이사이에 선 넣기 */}

        {/* 라이브 스트리밍 비디오 썸네일
      aspect-video 사용하면 16:9 비디오 비율에 맞게 높이 자동 조절 */}
        {data?.streams.map((stream) => (
          <div className="px-4 pt-4" key={stream.id}>
            <Link href={`/streams/${stream.id}`}>
              <div className="w-full aspect-video rounded-md shadow-sm bg-slate-300" />
              <h3 className="text-gray-700 text-lg mt-2">{stream.name}</h3>
            </Link>
          </div>
        ))}
      </div>
      <div className="w-3/5 m-auto mt-3 p-3">
        <div className="flex justify-between">
          <button
            onClick={onPreBtn}
            disabled={pageIndex === 1}
            className={"disabled:text-gray-400"}
          >
            {"< 이전"}
          </button>
          {Array(numPages)
            .fill(1)
            .map((_, i) => (
              <button key={i + 1} onClick={() => setPageIndex(i + 1)}>
                {i + 1}
              </button>
            ))}
          <button
            onClick={onNextBtn}
            disabled={pageIndex === numPages}
            className={"disabled:text-gray-400"}
          >
            {"이후 >"}
          </button>
        </div>
      </div>
      <FloatingButton href="/streams/create" text="라이브" />
    </Layout>
  );
};

export default Streams;
