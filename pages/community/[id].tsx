import Button from "@/components/button";
import Layout from "@/components/layout";
import Textarea from "@/components/textarea";
import UserBox from "@/components/user-box";
import Comment from "@/components/comment";

import type { NextPage } from "next";
import { useRouter } from "next/router";
import useSWR from "swr";
import { Post, Answer, User } from "@prisma/client";
import useMutation from "@/libs/server/useMutation";
import Link from "next/link";
import { cls } from "@/libs/server/utils";
import { useForm } from "react-hook-form";
import { useEffect } from "react";

interface AnswerWithUser extends Answer {
  user: User;
}

interface PostWithUserAndAnswers extends Post {
  user: User;
  answers: AnswerWithUser[];
  _count: { answers: number; recommendations: number };
}

interface CommunityPostResponse {
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

const CommunityPostDetail: NextPage = () => {
  const router = useRouter();
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset: resetAnswerForm,
  } = useForm<AnswerForm>();

  const {
    data,
    error,
    mutate: boundMutate,
  } = useSWR<CommunityPostResponse>(
    router.query.id ? `/api/posts/${router.query.id}` : null
  );

  console.log(data);

  const [toggleRecommendation, { loading: recommendLoading }] = useMutation(
    `/api/posts/${router.query.id}/recommendation`
  );

  const onRecommendationClick = () => {
    if (!data) return;

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

  //답변 보내기
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
    <Layout canGoBack>
      <div>
        <span
          className="inline-flex my-3 ml-4 items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800
        "
        >
          동네질문
        </span>
        {/*user-profile"*/}
        <Link href={`/users/profiles/${data?.post?.userId}`}>
          <div className="px-4 mb-3 py-3 border-b">
            <UserBox
              name={data?.post?.user.name}
              size="small"
              time={data?.post?.created.toString()}
            />
          </div>
        </Link>
        <div>
          <div className="mt-2 px-4 text-gray-700 flex flex-col space-y-2">
            <div className="text-xl font-semibold">
              <span className="text-orange-500">Q. </span>
              <span>{data?.post?.title}</span>
            </div>
            <p>{data?.post?.content}</p>
          </div>
          <div className="flex px-4 space-x-5 mt-3 text-gray-700 py-2.5 border-t border-b-[2px] w-full">
            <button
              onClick={onRecommendationClick}
              className={cls(
                "flex space-x-2 items-center text-sm focus:outline-none",
                data?.isRecommend ? "text-green-400" : ""
              )}
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
              <span>추천 {data?.post?._count.recommendations}</span>
            </button>
            <span className="flex space-x-2 items-center text-sm">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                ></path>
              </svg>
              <span>답변 {data?.post?._count.answers}</span>
            </span>
          </div>
        </div>
        {/*댓글*/}
        <div className="px-4 my-5 space-y-5">
          {data?.post?.answers?.map((answer) => (
            <Comment
              key={answer.id}
              name={answer.user.name}
              time={answer.updated.toString()}
              comment={answer.answer}
            />
          ))}
        </div>
        <form className="px-4 space-y-2" onSubmit={handleSubmit(onValid)}>
          <Textarea
            register={register("answer", {
              required: true,
              minLength: {
                value: 2,
                message: "댓글을 2글자 이상 입력해주세요.",
              },
            })}
            name="answer"
            placeholder="댓글을 달아주세요."
            required
          />
          {errors?.answer ? <p>{errors.answer?.message}</p> : null}
          <Button loading={answerLoading} text="댓글달기" />
        </form>
      </div>
    </Layout>
  );
};

export default CommunityPostDetail;
