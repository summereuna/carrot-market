import withHandler, { ResponseType } from "@/libs/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";
import client from "@/libs/server/client";
import { withApiSession } from "@/libs/server/withSession";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const {
    session: { user },
    body: { email, phone, name, avatarUrl },
  } = req;

  if (req.method === "GET") {
    const profile = await client.user.findUnique({
      where: { id: user?.id },
    });

    return res.json({ ok: true, profile });
  }

  if (req.method === "PUT") {
    const currentUser = await client.user.findUnique({
      where: { id: user?.id },
    });

    //req.body에서 받은 email과 현재 유저의 이메일이 같지 않은 경우에만 진행
    if (email && email !== currentUser?.email) {
      const alreadyExistsEmail = Boolean(
        await client.user.findUnique({
          where: { email },
          select: { id: true },
        })
      );
      if (alreadyExistsEmail) {
        return res.json({ ok: false, error: "이미 사용중인 이메일입니다." });
      }
      await client.user.update({
        where: { id: user?.id },
        data: {
          email,
        },
      });

      res.json({ ok: true });
    }

    if (phone && phone !== currentUser?.phone) {
      const alreadyExistsPhone = Boolean(
        await client.user.findUnique({
          where: { phone },
          select: { id: true },
        })
      );
      if (alreadyExistsPhone) {
        return res.json({ ok: false, error: "이미 사용중인 전화번호입니다." });
      }
      await client.user.update({
        where: { id: user?.id },
        data: {
          phone,
        },
      });

      res.json({ ok: true });
    }

    //name은 unique아님
    if (name && name !== currentUser?.name) {
      const alreadyExistsName = Boolean(
        await client.user.findFirst({
          where: { id: user?.id, name },
          select: { id: true },
        })
      );
      if (alreadyExistsName) {
        return res.json({ ok: false, error: "이미 사용중인 이름입니다." });
      }

      console.log(alreadyExistsName);
      await client.user.update({
        where: { id: user?.id },
        data: {
          name,
        },
      });

      res.json({ ok: true });
    }

    if (avatarUrl) {
      await client.user.update({
        where: { id: user?.id },
        data: {
          avatar: avatarUrl,
        },
      });
      return res.json({ ok: true });
    }

    res.json({ ok: false, error: "현재 사용중인 이메일/전화번호입니다." });
  }

  if (req.method === "DELETE") {
    const isUserExist = await client.user.findUnique({
      where: { id: user?.id },
    });

    if (isUserExist?.id !== user?.id) {
      return res.status(404).json({
        ok: false,
        error: "본인이 아니면 탈퇴할 수 없습니다.",
      });
    }

    await client.user.delete({
      where: {
        id: isUserExist?.id,
      },
    });

    req.session.destroy();

    return res.status(200).json({ ok: true });
  }
}

//왜 감싸줘야 되냐면
//모든 API는 실제 백엔드 없이(serverless) 개별적으로 동작하기 때문애 각 API마다 type과 withIronSessionApiRoute config를 매번 설정해줘야 한다.
//브라우저에 있는 쿠키의 세션에 userId가 저장되어 있기 때문에 프리즈마로 해당 id를 가진 user의 정보를 가져올 수 있다.

//GET으로 해야 req.session.user 가져올 수 있음
export default withApiSession(
  withHandler({ methods: ["GET", "PUT", "DELETE"], handler })
);
//withHandler 설정 객체 보내기
// isPrivate에 true를 보내면, me 핸들러는 로그인 한 유저만 호출할 수 있게 된다.
