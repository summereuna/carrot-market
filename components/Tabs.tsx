import { cls } from "@/libs/client/utils";
import { useState } from "react";

interface Tab {
  id: number;
  label: string;
  content: any;
}

interface TabsProps {
  tabs: Tab[];
}
export default function Tabs({ tabs }: TabsProps) {
  const [activeTab, setActiveTab] = useState(tabs[0].id);

  const handleTabChange = (tabId: number) => {
    setActiveTab(tabId);
  };

  return (
    <div>
      <div className="flex justify-between w-full border-b font-semibold text-gray-400 cursor-pointer">
        <div className="-mb-px flex w-full">
          {tabs.map((tab) => (
            <div
              key={tab.id}
              className={cls(
                "flex w-1/3 py-2 items-center justify-center space-y-2 border-b-2",
                activeTab === tab.id
                  ? "text-orange-500 border-orange-500 active"
                  : "hover:text-gray-500 hover:border-gray-300 border-transparent"
              )}
              onClick={() => handleTabChange(tab.id)}
            >
              {tab.label}
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col space-y-5 pt-5 pb-10 divide-y">
        {tabs.map(
          (tab) =>
            activeTab === tab.id && (
              <div key={tab.id}>
                {tab.content.length > 0 ? (
                  tab.content
                ) : tab.label !== tabs[0].label ? (
                  <div className="flex flex-col mt-20 text-center text-sm text-gray-400">
                    <p>{tab.label}인 판매 상품이 없어요.</p>
                  </div>
                ) : (
                  <div className="flex flex-col mt-20 text-center text-sm text-gray-400">
                    <p>판매 상품이 없어요.</p>
                  </div>
                )}
              </div>
            )
        )}
      </div>
    </div>
  );
}

//아 컨텐츠 부분 너무 지저분함
