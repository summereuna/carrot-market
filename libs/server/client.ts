import { PrismaClient } from "@prisma/client";

declare global {
  var client: PrismaClient | undefined;
}

//prisma Client 인스턴스 많이 생성되어 실행되는 문제 해결 위해
//client가 global object에 저장되어 있는 client와 같다고 하기

//1. 앱 처음 구동 시, 글로벌 클라이언트가 존재하지 않으므로 새로운 프리즈마 클리아언트 생성
//(+)그러고 나서 앱 구동 시, 글로벌 클라이언트 존재하고 있으니까 프리즈마 클라이언트가 저장되어 있는 "글로벌 클라이언트" 사용하기
const client = global.client || new PrismaClient();

//2. 처음 파일 실행될 때,
//global.client에 새로 생성한 프리즈마 클라이언트에 넣기
//(NODE_ENV가 development일 때만, 글로벌 클라이언트에 위의 클라이언트 저장)
if (process.env.NODE_ENV === "development") global.client = client;

//3. 클라이언트를 기본값으로 내보내기
export default client;
