import withHandler, { ResponseType } from "@/libs/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";
import client from "@/libs/server/client";
import { withApiSession } from "@/libs/server/withSession";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const {
    body: { date, chat, isReservedAlarm, chatRoomId },
    query: { id }, //프로덕트
    session: { user },
  } = req;

  if (req.method === "GET") {
    const productReservation = await client.product.findUnique({
      where: { id: +id!.toString() },
      select: {
        reservation: true,
      },
    });
    const chatRoom = await client.chatRoom.findFirst({
      where: {
        userId: user?.id,
        productId: +id!.toString(),
      },
      select: { id: true },
    });
    return res.json({
      ok: true,
      productReservation,
      chatRoom,
    });
  }

  if (req.method === "POST") {
    //프로덕트 있는지 확인 있는지 확인, 없으면 404
    const isProductExist = await client.product.findUnique({
      where: { id: +id!.toString() },
      select: { id: true },
    });

    if (!isProductExist) {
      return res.status(404).json({
        ok: false,
        error: "상품이 존재하지 않아 예약을 진행할 수 없습니다.",
      });
    }

    //내가 해당 상품 이미 reservation 했는지 안했는지 체크
    const alreadyExistsReservation = await client.reservation.findFirst({
      where: {
        userId: user?.id,
        productId: +id!.toString(),
      },
    });
    const alreadyExistsReservationChat = await client.chat.findFirst({
      where: {
        userId: user?.id,
        chatRoomId: chatRoomId,
        isReservedAlarm: true,
      },
    });
    //reservation 찾아서 확인했으니 reservation의 id도 가지고 있는 상태
    //존재하면 데이터 업데이트 혹은 삭제
    //존재하지 않으면 생성
    if (alreadyExistsReservation && alreadyExistsReservationChat) {
      //업데이트
      if (date && chat) {
        const reservation = await client.reservation.update({
          where: { id: alreadyExistsReservation.id },
          data: {
            date,
          },
        });

        //알림 챗은 새로 만드는게 나은거 같기도 하고
        const reservedChat = await client.chat.create({
          //where: { id: alreadyExistsReservationChat.id },
          data: {
            chat: chat,
            isReservedAlarm: isReservedAlarm,
            user: { connect: { id: user?.id } },
            chatRoom: { connect: { id: chatRoomId } },
          },
        });

        return res.json({
          ok: true,
          reservation,
          reservedChat,
        });
      } else {
        //삭제
        //지우기
        //delete()는 unique 필드로만 삭제가능함. id를 위에서 찾아놨으니 사용 가능
        await client.reservation.delete({
          where: { id: alreadyExistsReservation.id },
        });
        await client.chat.delete({
          where: { id: alreadyExistsReservationChat.id },
        });

        return res.json({
          ok: true,
        });
      }
    } else {
      const reservation = await client.reservation.create({
        data: {
          date,
          user: {
            connect: {
              id: user?.id,
            },
          },
          product: {
            connect: {
              id: +id!.toString(),
            },
          },
        },
      });

      const reservedChat = await client.chat.create({
        data: {
          chat: chat,
          isReservedAlarm: isReservedAlarm,
          user: { connect: { id: user?.id } },
          chatRoom: { connect: { id: chatRoomId } },
        },
      });

      return res.json({
        ok: true,
        reservation,
        reservedChat,
      });
    }
  }
}
export default withApiSession(
  withHandler({ methods: ["GET", "POST"], handler })
);
