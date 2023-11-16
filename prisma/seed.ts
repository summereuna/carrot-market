// 테스트 위해 가짜 데이터 생성하기(seeding)
import { PrismaClient } from "@prisma/client";

const client = new PrismaClient();

async function main() {
  [...Array.from(Array(200).keys())].forEach(async (item) => {
    await client.stream.create({
      data: {
        name: String(item),
        description: String(item),
        price: item,
        user: {
          connect: {
            id: 29, //테스트유저 아이디
          },
        },
      },
    });
    console.log(`${item}/500`);
  });
}

main()
  .catch((e) => console.log(e))
  .finally(() => client.$disconnect());

/*
Seeding your database
시딩을 사용하면 데이터베이스에서 동일한 데이터를 일관되게 다시 생성할 수 있으며 다음을 수행할 수 있습니다.
1. 애플리케이션을 시작하는 데 필요한 데이터(예: 기본 언어 또는 기본 통화)로 데이터베이스를 채웁니다.
2. 개발 환경에서 애플리케이션을 검증하고 사용하기 위한 기본 데이터를 제공합니다.

npm install -D ts-node

데이터베이스를 시드하려면 db seed CLI 명령을 실행하십시오.
npx prisma db seed
```
// package.json
"prisma": {
"seed": "ts-node --compiler-options {\"module\":\"CommonJS\"} prisma/seed.ts"
},
```
https://www.prisma.io/docs/guides/database/seed-database

Seed 사용 예시
https://www.prisma.io/docs/guides/database/seed-database#example-seed-scripts
  */
