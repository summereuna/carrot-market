import withHandler, { ResponseType } from "@/libs/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";
import client from "@/libs/client/client";
import { withApiSession } from "@/libs/server/withSession";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  //프론트엔드에 router.query 있는 것 처럼, 백엔드엔 req.query 있음
  // console.log(req.query);
  const {
    query: { id },
    session: { user },
  } = req;

  //req.query로 부터 오는 id의 타입이 string | string[] | undefined 이기 때문에
  //아래에서 id로 찾을 때 .toString()써서 스트링으로 찾고,
  //id는 숫자로 랜덤 생성되니까 + 붙이기
  //스트링 배열일 수 있는 이유: route에 id가 여러개 붙는 경우 때문, [...id] catch-all route인 경우, /1/32/3 뭐 이런식

  //id가 string | string[] 만되게 id가 있는 경우만 실행
  //그러고 나서 id를 number로 변경 +
  if (id) {
    const product = await client.product.findUnique({
      where: {
        id: +id.toString(),
      },
      //유저 연결
      //include: { user: true },

      //필요한 유저 데이터만 요청
      include: { user: { select: { id: true, name: true, avatar: true } } },
    });

    // 비슷한 상품 추천
    //상품 이름 띄워쓰기로 구별해서 [] 배열 만들어 넣기
    const terms = product?.name.split(" ").map((word) => ({
      name: {
        contains: word,
      },
    }));

    const relatedProducts = await client.product.findMany({
      where: {
        OR: terms, //배열에 있는 이름 해당하는 상품 이름 다 가져오기
        AND: {
          id: { not: product?.id }, //본 상품은 빼고
        },
      },
    });

    //위시 버튼 눌렀는지 확인
    //조건 만족하는 wish 레코드의 첫 번째 아이템 찾기
    // productId 가 product.id와 같고 userId가 user.id와 같은
    //결과 값은 wish 레코드를 리턴하기 때문에 이를 boolean으로 감싸주기
    const isWished = Boolean(
      await client.wish.findFirst({
        where: {
          productId: product?.id,
          userId: user?.id,
        },
        select: { id: true },
        //DB를 좀 더 경제적으로 사용하기 위해 wish 레코드의 모든 필드 가져오지 않고 id만 가져오기
      })
    );

    res.json({
      ok: true,
      product,
      isWished,
      relatedProducts,
    });
  }
}

export default withApiSession(withHandler({ methods: ["GET"], handler }));
