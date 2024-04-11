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
  console.log(data?.chats);
  console.log(user);
  return (
    <Layout title="채팅" hasTabBar>
      <Seo title="채팅 | 당근마켓" description="당근마켓 채팅" />
      <div className="flex flex-col pb-3 divide-y">
        {data?.chats?.map((chatRoom) => (
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
