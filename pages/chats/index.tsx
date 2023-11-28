import ChatRoom from "@/components/chatRoom";
import Layout from "@/components/layout";
import useUser from "@/libs/client/useUser";
import type { NextPage } from "next";
import Head from "next/head";
import useSWR from "swr";

const Chats: NextPage = () => {
  const user = useUser();
  const { data } = useSWR(`api/chats`);
  console.log(data?.chats);
  console.log(user);
  return (
    <Layout title="채팅" hasTabBar>
      <Head>
        <title>채팅</title>
      </Head>
      <div className="divide-y-[1px] ">
        {data?.chats?.map((chatRoom) => (
          <ChatRoom
            key={chatRoom.id}
            roomId={chatRoom.id}
            updated={chatRoom.updated}
            otherUserName={
              user?.user?.id === chatRoom.user.id
                ? chatRoom.product.user.name
                : chatRoom.user.name
            }
            otherUserAvatarUrl={
              user?.user?.id === chatRoom.user.id
                ? chatRoom.product.user.avatar
                : chatRoom.user.avatar
            }
            lastChat={JSON.stringify(chatRoom.chats.at(-1).chat)}
          />
        ))}
      </div>
    </Layout>
  );
};

export default Chats;
