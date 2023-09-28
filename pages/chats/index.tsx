import Layout from "@/components/layout";
import User from "@/components/user";
import type { NextPage } from "next";
import Link from "next/link";

const Chats: NextPage = () => {
  return (
    <Layout title="채팅" hasTabBar>
      <div className="divide-y-[1px] ">
        {[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1].map((_, i) => (
          <div key={i}>
            <Link href="/chats/userId">
              <div className="cursor-pointer px-4 py-3 flex space-x-3 items-center">
                <div>
                  <div className="w-12 h-12 rounded-full bg-slate-300" />
                </div>
                <div className="flex flex-col">
                  <div className="space-x-2">
                    <span className="font-medium text-gray-700">당근케익</span>
                    <span className="text-xs text-gray-500">오전 12:50</span>
                  </div>
                  <span className="text-sm text-gray-500">
                    오후 7시 이후 역 앞에서 가능하신가요?
                  </span>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default Chats;
