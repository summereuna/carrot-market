import ChattingRoom from "@/components/ChattingRoom";
import Layout from "@/components/Layout";
import Seo from "@/components/Seo";
import useUser from "@/libs/client/useUser";
import { Chat, ChatRoom } from "@prisma/client";
import type { NextPage } from "next";
import useSWR from "swr";

interface PurchaserInfo {
  name: string;
  avatar?: string;
  id: number;
}

interface SellerInfo {
  user: { name: string; avatar?: string; id: number };
}

interface ChatRoomWithUsersInfoAndChats extends ChatRoom {
  user: PurchaserInfo;
  product: SellerInfo;
  chats: Chat[];
}

interface ChatRoomResponse {
  data: boolean;
  chats: ChatRoomWithUsersInfoAndChats[];
}

const Chats: NextPage = () => {
  const { user } = useUser();
  const { data } = useSWR<ChatRoomResponse>(`api/chats`);

  return (
    <Layout title="채팅" hasTabBar>
      <Seo title="채팅 | 당근마켓" description="당근마켓 채팅" />
      <div className="flex flex-col pb-3 divide-y">
        {data?.chats.length === 0 && (
          <div>
            <div className="cursor-pointer px-4 py-3 flex space-x-3 items-center">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-full bg-amber-200 flex items-center justify-center">
                  <span className="text-3xl">🥕</span>
                </div>
              </div>
              <div className="flex flex-col">
                <div className="space-x-2">
                  <span className="font-medium text-gray-700">당근팀</span>
                  <span className="text-xs text-gray-500"></span>
                </div>
                <span className="text-sm text-gray-500">
                  환영합니다! 채팅을 시작해 보세요!
                </span>
              </div>
            </div>
          </div>
        )}
        {data?.chats &&
          data?.chats?.map((chatRoom) => (
            <ChattingRoom
              key={chatRoom.id}
              roomId={chatRoom.id}
              updated={chatRoom.updated}
              otherUserName={
                user?.id === chatRoom.user.id
                  ? chatRoom.product.user.name
                  : chatRoom.user.name
              }
              otherUserAvatarUrl={
                user?.id === chatRoom.user.id
                  ? chatRoom.product.user.avatar
                  : chatRoom.user.avatar
              }
              lastChat={
                chatRoom.chats.length > 0
                  ? chatRoom?.chats?.at(-1)?.chat
                  : `🥕 채팅을 시작해 보세요!`
              }
            />
          ))}
      </div>
    </Layout>
  );
};

export default Chats;
