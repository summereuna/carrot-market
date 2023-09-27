import Layout from "@/components/layout";
import type { NextPage } from "next";
import Link from "next/link";

const Chats: NextPage = () => {
  return (
    <Layout title="채팅" hasTabBar>
      <div className="py-3 divide-y-[1px] ">
        {[1, 1, 1].map((_, i) => (
          <div key={i}>
            <Link href="/chats/userId">
              <div className="flex px-4 cursor-pointer py-3 items-center space-x-3">
                <div className="w-12 h-12 rounded-full bg-slate-300" />
                <div>
                  <p className="text-gray-700">참치맛오이</p>
                  <p className="text-sm  text-gray-500">
                    오후 7시 이후 역 앞에서 가능하신가요?
                  </p>
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
