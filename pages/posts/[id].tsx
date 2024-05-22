import Layout from "@/components/Layout";
import UserBox from "@/components/UserBox";
import Comment from "@/components/Comment";

import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { useRouter } from "next/router";
import useSWR from "swr";
import { Post, Answer, User } from "@prisma/client";
import useMutation from "@/libs/client/useMutation";
import Link from "next/link";
import { cls } from "@/libs/client/utils";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import Seo from "@/components/Seo";
import client from "@/libs/server/client";
import FloatingInput from "@/components/FloatingInput";
import useUser from "@/libs/client/useUser";

interface AnswerWithUser extends Answer {
  //프론트
  user: User;
}

interface PostWithUserAndAnswers extends Post {
  id: number; //프론트
  user: User; // 백
  answers: AnswerWithUser[]; //프론트
  _count: { answers: number; recommendations: number };
}

export interface CommunityPostResponse {
  ok: boolean;
  post: PostWithUserAndAnswers;
  isRecommend: boolean;
}

interface AnswerForm {
  answer: string;
}

interface AnswerFormResponse {
  ok: boolean;
  answer: Answer;
}

const PostDetail: NextPage<CommunityPostResponse> = ({ post }) => {
  const router = useRouter();
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset: resetAnswerForm,
  } = useForm<AnswerForm>();

  const { user } = useUser();

  //1. post의 user,answers, _count 데이터 / isRecommend 불리언 값 get
  const {
    data,
    error,
    mutate: boundMutate,
  } = useSWR<CommunityPostResponse>(
    router.query.id ? `/api/posts/${router.query.id}` : null
  );

  // 2. 좋아요 버튼
  const [toggleRecommendation, { loading: recommendLoading }] = useMutation(
    `/api/posts/${router.query.id}/recommendation`
  );

  const onRecommendationClick = () => {
    if (!data) return;

    //swr로 local에서 mutate하기
    //optimistic ui update in local
    boundMutate(
      {
        ...data,
        post: {
          ...data?.post,
          _count: {
            ...data.post._count,
            recommendations: data.isRecommend
              ? data.post._count.recommendations - 1
              : data.post._count.recommendations + 1,
          },
        },
        isRecommend: !data.isRecommend,
      },
      false
    );

    // 백엔드로 보내기: 빠르게 토글했을 때 발생하는 race condition 문제 해결 위해 이전 요청 완료된 후에만 요청 보내기
    if (!recommendLoading) {
      toggleRecommendation({});
    }
  };

  //댓글 작성
  const [sendAnswer, { loading: answerLoading, data: answerData }] =
    useMutation<AnswerFormResponse>(`/api/posts/${router.query.id}/answers`);

  const onValid = (answerForm: AnswerForm) => {
    if (answerLoading) return;
    sendAnswer(answerForm);
  };

  useEffect(() => {
    if (answerData && answerData.ok) {
      resetAnswerForm();
      //댓글도 optimistic ui update in local 하려니까
      //너무 코드 길어져서 그냥 boundMutate 호출하여 data re-fetch 해오기
      boundMutate();
    }
  }, [answerData, resetAnswerForm, boundMutate]);
  return (
    <Layout canGoBack isMe={user?.id !== post?.userId ? false : true}>
      <Seo
        title={`${post?.title} | 동네생활`}
        description={`네이버후드 동네 생활: ${post?.content}`}
      />
      <div className="border-b-8 border-slate-100 w-full space-y-5 py-3">
        <span
          className="ml-4 inline-flex my-3 items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800
        "
        >
          동네질문
        </span>
        {/*user-profile"*/}
        <div className="px-4">
          <UserBox
            name={post?.user.name!}
            size="small"
            time={post?.created!}
            avatar={post?.user.avatar}
            userId={post?.user.id}
          />
        </div>
        {/* 내용 */}
        <div className="px-4 text-gray-700 flex flex-col space-y-3">
          <div className="text-xl font-semibold">
            <span>{post?.title}</span>
          </div>
          <p>{post?.content}</p>
          <div className="py-1">
            <button
              onClick={onRecommendationClick}
              className={cls(
                "flex space-x-2 items-center text-sm focus:outline-none border-[1px] py-1 px-3 rounded-2xl",
                data?.isRecommend ? "text-lime-500 border-lime-500" : ""
              )}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z"
                />
              </svg>
              <span>{data?.post?._count.recommendations}</span>
            </button>
          </div>
        </div>
      </div>
      {/* 내용 */}

      {/*댓글은 SWR로 클라이언트 단에서 받아옴*/}
      <div className="px-4 my-5 space-y-5 mb-20">
        <div className="flex space-x-2 items-center text-gray-700 text-sm">
          <span>댓글 {data?.post._count.answers}</span>
        </div>
        {data?.post.answers?.map((answer) => (
          <Comment
            key={answer.id}
            name={answer.user.name}
            time={answer.updated.toString()}
            comment={answer.answer}
            avatar={answer.user.avatar ? answer.user.avatar : undefined}
            userId={answer.user.id}
          />
        ))}
      </div>

      {/*플로팅 댓글창 고정*/}
      <div className="bg-gray-100 fixed bottom-0 p-2 inset-x-0 z-20">
        <form
          onSubmit={handleSubmit(onValid)}
          className="relative flex max-w-md items-center w-full mx-auto"
        >
          <FloatingInput
            register={register("answer", {
              required: true,
              minLength: {
                value: 1,
                message: "댓글을 1 글자 이상 입력해 주세요.",
              },
            })}
            name="answer"
            placeholder="댓글을 입력해주세요."
            required
            errorMessage={errors?.answer ? errors.answer?.message : null}
            isLoading={answerLoading}
          />
        </form>
      </div>
    </Layout>
  );
};

export default PostDetail;

//미리 빌드해 놓지 않고 사용자 요청시 빌드하여 보여주기
export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

//post만 정적 생성하고
//사용자 상호작용인 isRecommendation은 useSWR로 가져와 mutate하기
export const getStaticProps: GetStaticProps = async (context) => {
  const id = context.params?.id;

  const post = await client.post.findUnique({
    where: {
      id: +id!.toString(),
    },
    //사전 렌더링할 post 및 user, _count
    include: {
      user: { select: { id: true, name: true, avatar: true } },
      _count: { select: { answers: true, recommendations: true } },
    },
  });

  return {
    props: {
      post: JSON.parse(JSON.stringify(post)),
    },
  };
};
