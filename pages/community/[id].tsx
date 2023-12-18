import Button from "@/components/button";
import Layout from "@/components/layout";
import Textarea from "@/components/textarea";
import UserBox from "@/components/user-box";
import Comment from "@/components/comment";

import type { NextPage } from "next";
import { useRouter } from "next/router";
import useSWR from "swr";
import { Post, Answer, User } from "@prisma/client";
import useMutation from "@/libs/client/useMutation";
import Link from "next/link";
import { cls } from "@/libs/client/utils";
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
      <div className="border-b-8 border-slate-100 w-full space-y-5 py-3">
        <span
          className="ml-4 inline-flex my-3 items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800
        "
        >
          동네질문
        </span>
        {/*user-profile"*/}
        <Link href={`/users/profiles/${data?.post?.userId}`}>
          <div className="px-4">
            <UserBox
              name={data?.post?.user.name}
              size="small"
              time={data?.post?.created}
              avatar={data?.post?.user.avatar}
            />
          </div>
        </Link>
        {/* 내용 */}
        <div className="px-4 text-gray-700 flex flex-col space-y-3">
          <div className="text-xl font-semibold">
            <span>{data?.post?.title}</span>
          </div>
          <p>{data?.post?.content}</p>
          <div className="py-1">
            <button
              onClick={onRecommendationClick}
              className={cls(
                "flex space-x-2 items-center text-sm focus:outline-none border-[1px] py-1 px-3 rounded-2xl",
                data?.isRecommend ? "text-orange-400 border-orange-400" : ""
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

      {/*댓글*/}
      <div className="px-4 my-5 space-y-5">
        <div className="flex space-x-2 items-center text-gray-700 text-sm">
          <span>댓글 {data?.post?._count.answers}</span>
        </div>
        {data?.post?.answers?.map((answer) => (
          <Comment
            key={answer.id}
            name={answer.user.name}
            time={answer.updated.toString()}
            comment={answer.answer}
            avatar={answer.user.avatar}
          />
        ))}
      </div>

      {/*댓글 입력 폼*/}
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
    </Layout>
  );
};

export default CommunityPostDetail;
