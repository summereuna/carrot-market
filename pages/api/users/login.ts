import client from "@/libs/server/client";
import sendEmail from "@/libs/server/email";
import withHandler, { ResponseType } from "@/libs/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const messagingServiceSid = process.env.TWILIO_MESSAGING_SERVICE_SID;
const fromNumber = process.env.TWILIO_PHONE_NUMBER;
const toNumber = process.env.MY_PHONE_NUMBER;

const twilioClient = require("twilio")(accountSid, authToken);

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  //api route가 받은 req.body에서 폰이나 이메일 둘 중 하나 가져오기
  const { email, phone } = req.body;

  const userEnterInfo = email ? { email } : phone ? { phone } : null;

  //유저 입력정보 null이면 배드리퀘스트 보내기
  if (!userEnterInfo) return res.status(400).json({ ok: false });

  const payload = Math.floor(100000 + Math.random() * 900000) + "";

  //토큰 생성 및 유저 생성
  const token = await client.token.create({
    data: {
      payload,
      user: {
        //connect는 새로운 토큰을 이미 존재하는 유저와 연결
        //create는 새로운 토큰과 새로운 유저 생성
        //connectOrCreate 는 유저를 찾아서 토큰 연결하므로 위의 코드 없어도 됨
        connectOrCreate: {
          //유저가 있으면 페이로드(이메일/폰넘버) 넣어주기
          where: { ...userEnterInfo },
          //유저가 없으면 유저 새로 만들고, 유저에 토큰 연결
          create: {
            name: email ? email.split("@", 1)[0] : `익명`,
            ...userEnterInfo,
          },
        },
      },
    },
  });

  //폰이면 트윌리오 SMS 문자보내기
  if (phone) {
    //돈 아껴야 되니까 주석 처리 ^^..
    // const message = await twilioClient.messages.create({
    //   messagingServiceSid: messagingServiceSid,
    //   from: fromNumber,
    //   to: toNumber!, //phone으로 줘야 하는게 맞지만 트라이얼이니까
    //   // ! 사용하여 확실히 존재하는 변수라고 타입스크립트에게 알리기
    //   body: `타인노출금지 [당근마켓] 인증번호 [${payload}]`,
    //});
    //console.log(message);
  } else if (email) {
    //이메일도 마찬가지 주석 처리
    //이메일일 때
    // sendEmail(email, payload);
  }

  //res 반환: data.ok
  return res.json({
    ok: true,
  });
}

export default withHandler({ methods: ["POST"], handler, isPrivate: false });
//withHandler(HTTP 메소드, handler 함수)
//외부에서 핸들러 함수를 고차 함수에 인자로 전달하여 더 유연하게 사용 가능

//퍼블릭 핸들러(로그인 하기 전): isPrivate: false
