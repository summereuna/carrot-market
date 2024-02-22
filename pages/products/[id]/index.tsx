import Button from "@/components/button";
import Layout from "@/components/layout";
import UserBox from "@/components/user-box";
import useMutation from "@/libs/client/useMutation";
import { cls } from "@/libs/client/utils";
import { ChatRoom, Product, User } from "@prisma/client";
import type { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import useSWR, { useSWRConfig } from "swr";
import { useEffect } from "react";
import Image from "next/image";
import useUser from "@/libs/client/useUser";

//프리즈마 클라이언트의 Product 타입에는 연결된 user에 대한 타입이 없으므로 확장시켜주기
interface ProductWithUserAndStateCheck extends Product {
  user: User;
  reservation: { id: number };
  review: { id: number; length: number };
}

interface ProductDetailResponse {
  ok: boolean;
  product: ProductWithUserAndStateCheck;
  isWished: boolean;
  relatedProducts: Product[];
}

interface CreateChatRoomResponse {
  ok: boolean;
  chatRoom: ChatRoom;
}

const ProductDetail: NextPage = () => {
  const { user } = useUser();
  const router = useRouter();
  //router가 마운트 중이기 때문에 /${router.query.id}로 바로 보낼 수 없다
  //undefined 뜰 수도 있기 때문에 처음부터 id에 접근할 수 없으므로 먼저 있는지 체크하자 => optional query

  //bound mutate : 제한된 뮤테이트라는 말은 mutate가 여기에 있는 data만 변경할 수 있다는 뜻
  //useSWR 함수로 부터 나온 결과값인 data, mutate 이므로
  //useSWR로 보낸 요청으로 받은 응답 data를 변경하고 싶다면 mutate 함수를 사용
  const { data, mutate: boundMutate } = useSWR<ProductDetailResponse>(
    router.query.id ? `/api/products/${router.query?.id}` : null
  );

  //Optimistic UI Update (백엔드로 보낸 요청이 작동할 거라는 것에 낙관적(optimistic)
  //기본적으로 백엔드에 요청을 보낼 때 백엔드 응답 기다리지 않고 일단 변경사항 반영 ㅇㅇㅇ
  //어차피 될거니까 ^^~~
  //그래서 유저에게 클릭했다는 것을 표시하고 하트 색 바꾸자
  const [toggleWish] = useMutation(`/api/products/${router.query?.id}/wish`);

  const onWishClick = () => {
    //api에 요청보내기
    toggleWish({}); //빈 객체 보내어 body가 빈 post요청 보내기
    //어짜피 걍 눈에 보이기만 하믄 되니깐.. 빈 바디 보내도 db의 ish 리스트에 잘 들어가지니까 문제 없음

    //빠른 반응형 UI위해 Optimistic UI Update
    //Optimistic UI update를 위한 Bound(제한된) Mutation: SWR 캐시에 있는 데이터를 mutate 하는 방법
    //api 응답 기다리지 않고 바로바로 하트 색 유저에게 보여주기 위해 데이터 mutate하기

    //mutate 함수로 캐시만 변경, Api는 다시 부르지 않기(false)
    if (!data) return;
    boundMutate((prev) => prev && { ...prev, isWished: !prev.isWished }, false);
    // 첫 번째 인자: 캐시에 있는 데이터 대신 사용할 새로운 데이터(아무 객체나 넣어도 바로 새로운 데이터 됨)
    // ㄴ 바로 첫번째 인자에 넣은 객체의 데이터로 변경됨, 따라서 유저에게 화면 UI의 변경사항 보여주기 위한 부분
    // 두 번째 인자: revalidation으로 true(SWR이 진짜 데이터 찾아서 불러오게 할 수 있음)/false(안불러옴)
    // ㄴ 변경이 일어난 후, 다시 API에서 데이터를 불러올지 결정하는 부분

    //그래서 이렇게 하면 api를 기다릴 필요 없이 아주 빠른 반응형 UI를 얻을 수 있음
  };

  //채팅룸 생성
  const [createChatRoom, { data: chatRoomData }] =
    useMutation<CreateChatRoomResponse>(`/api/chats`);

  const onChatClick = () => {
    const wantToChatWithSeller = confirm("판매자와 채팅하시겠습니까?");
    if (wantToChatWithSeller && data && user?.id !== data?.product?.userId) {
      const chatRoomInfo = {
        productId: router.query.id,
        productUserId: data.product.userId,
      };

      createChatRoom(chatRoomInfo);
    }
  };

  useEffect(() => {
    if (chatRoomData && chatRoomData.ok) {
      router.push(`/chats/${chatRoomData?.chatRoom?.id}`);
    }
  });

  //? data 객체 있으면 데이터 출력하거나 로딩중임을 표시하는게 좋음
  //1초 이상 걸리는 작업에는 로딩 중임을 표시하는게 더 좋음
  //일단 ?로 만들고 나중에 필요하면 스켈레톤 넣기
  return (
    <Layout canGoBack>
      <div className="px-4">
        <div className="mb-8">
          <div className="relative pb-[348px] -z-10">
            <Image
              src={data?.product?.image!}
              alt="product-image"
              fill={true}
              className="bg-slate-100 absolute object-scale-down"
            />
          </div>
          <Link href={`/profile/${data?.product?.userId}`}>
            <div className="py-3 border-t border-b">
              <UserBox
                name={data?.product?.user?.name!}
                avatar={
                  data?.product?.user?.avatar
                    ? data?.product?.user?.avatar
                    : undefined
                }
                size="small"
                time={data?.product?.created}
                userId={data?.product?.userId}
              />
            </div>
          </Link>
          {/*product-info*/}
          <div className="mt-5 space-y-5">
            <div>
              {data?.product?.reservation &&
                !(data?.product?.review.length > 0) && (
                  <span className="bg-emerald-500 rounded-md px-2 py-1 text-xs text-white font-medium">
                    예약중
                  </span>
                )}
              {data?.product?.reservation &&
                data?.product?.review?.length > 0 && (
                  <span className="bg-gray-700 rounded-md px-2 py-1 text-xs text-white font-medium">
                    거래완료
                  </span>
                )}
              <h1 className="text-xl font-bold text-gray-900">
                {data?.product?.name}
              </h1>
            </div>

            <p className="text-base text-gray-700">
              {data?.product?.description}
            </p>
          </div>
        </div>

        {/*recommend items*/}
        <div className="mt-5 mb-16 py-6 border-t-[1px]">
          <h2 className="text-xl font-bold text-gray-900">비슷한 상품</h2>
          <div className="mt-6 grid grid-cols-2 gap-4">
            {data?.relatedProducts?.map((product) => (
              <div key={product?.id}>
                <Link href={`/products/${product?.id}`}>
                  <div className="mb-2 h-48 max-w-full bg-slate-100 relative rounded-md border-[1px]">
                    <Image
                      src={product?.image}
                      alt="product-image"
                      fill={true}
                      className="absolute object-cover rounded-md"
                    />
                  </div>
                  <h3 className="text-sm text-gray-700 -mb-1">
                    {product?.name}
                  </h3>
                  <span className="text-sm font-semibold text-gray-900">
                    {product?.price.toLocaleString()}원
                  </span>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/*네비게이션 바
      모바일 사이즈로 일단 작업하기 위해 max-w-xl 줘서 fixed된 바 크기 조정*/}
      <nav className="bg-white max-w-xl text-gray-700 border-t fixed bottom-0 w-full px-2 py-3 grid grid-cols-2">
        {/*add to like-list btn*/}
        <div className="flex items-center space-x-3">
          <button
            onClick={onWishClick}
            className={cls(
              "px-3 py-2 flex items-center justify-center focus:outline-none border-r-[1px]",
              data?.isWished
                ? "text-red-400 hover:text-gray-500"
                : "text-gray-400 hover:text-red-500"
            )}
          >
            {data?.isWished ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                  clipRule="evenodd"
                />
              </svg>
            ) : (
              <svg
                className="h-6 w-6 "
                xmlns="http://www.w3.org/3000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            )}
          </button>
          <span className="text-xl font-semibold text-gray-900">
            {data?.product?.price ? data?.product?.price.toLocaleString() : "0"}
            원
          </span>
        </div>

        {/*direct-message btn*/}
        {!((data?.product?.review?.length as number) > 0) &&
        user?.id !== data?.product?.userId ? (
          <Button text="채팅하기" large onClick={onChatClick} />
        ) : (
          <Button text="채팅하기" large onClick={onChatClick} disabled />
        )}
      </nav>
    </Layout>
  );
};

export default ProductDetail;
