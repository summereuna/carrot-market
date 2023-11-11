import Button from "@/components/button";
import Layout from "@/components/layout";
import Textarea from "@/components/textarea";
import useMutation from "@/libs/server/useMutation";
import { Post } from "@prisma/client";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

interface WriteForm {
  title: string;
  content: string;
}
interface WriteFormResponse {
  ok: boolean;
  post: Post;
}

const Write: NextPage = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<WriteForm>();

  const [post, { loading, data }] =
    useMutation<WriteFormResponse>("/api/posts");

  const onValid = (data: WriteForm) => {
    //console.log(postData);
    if (loading) return;
    post(data); //요청 보내기
  };

  const router = useRouter();

  useEffect(() => {
    if (data && data.ok) {
      router.push(`/community/${data.post.id}`);
    }
  }, [data, router]);

  return (
    <Layout canGoBack title="동네생활 글쓰기">
      <div className="px-4 py-2 space-y-2">
        <div
          className="cursor-pointer flex items-center justify-between px-3 py-3 text-gray-800 border-b border-gray-300
        "
        >
          <span>동네질문</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 4.5l7.5 7.5-7.5 7.5"
            />
          </svg>
        </div>
        <div className="p-4 bg-gray-200 rounded-xl">
          <span className="text-xs font-bold mr-2">안내</span>
          <span className="text-xs">
            중고거래 관련, 명예훼손, 광고/홍보 목적의 글은 올리실 수 없어요.
          </span>
        </div>
        <form className="space-y-2" onSubmit={handleSubmit(onValid)}>
          <input
            type="text"
            {...register("title", {
              required: true,
              minLength: {
                value: 5,
                message: "제목을 5글자 이상 입력해주세요.",
              },
            })}
            placeholder="제목을 입력하세요 (5글자 이상 입력하기)"
            required
            minLength={5}
            className="text-gray-800 font-bold text-lg placeholder:text-gray-500 placeholder:font-bold placeholder:text-lg  appearance-none w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-400 focus:border-orange-400
                "
          />
          <Textarea
            register={register("content", {
              required: true,
              minLength: {
                value: 5,
                message: "내용을 5글자 이상 입력해주세요.",
              },
            })}
            name="community_write"
            required
            placeholder="가까이 사는 동네 이웃들에게 궁금한 것을 물어보세요! 근처 이웃이 친절하게 진짜 동네 정보를 알려줄거예요. (5글자 이상 입력하기)"
          />
          {errors?.title ? <p>{errors.title?.message}</p> : null}
          {errors?.content ? <p>{errors.content?.message}</p> : null}
          <Button text={loading ? "로딩중..." : "완료"} />
        </form>
      </div>
    </Layout>
  );
};

export default Write;
