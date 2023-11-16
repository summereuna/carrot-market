import Button from "@/components/button";
import Input from "@/components/input";
import Layout from "@/components/layout";
import Textarea from "@/components/textarea";
import useMutation from "@/libs/server/useMutation";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Stream } from "@prisma/client";

interface CreateStreamForm {
  name: string;
  price: string;
  description: string;
}

interface LiveFormResponse {
  ok: boolean;
  stream: Stream;
}

const Create: NextPage = () => {
  const { register, handleSubmit } = useForm<CreateStreamForm>();

  const [createStream, { data, loading }] =
    useMutation<LiveFormResponse>(`/api/streams`);

  const onValid = (validFormData: CreateStreamForm) => {
    if (loading) return;
    createStream(validFormData);
  };

  const router = useRouter();

  useEffect(() => {
    if (data && data.ok) {
      router.push(`/streams/${data.stream.id}`);
    }
  }, [data, router]);

  return (
    <Layout canGoBack title="라이브">
      <form onSubmit={handleSubmit(onValid)} className="px-4 py-10 space-y-5">
        <Input
          register={register("name", {
            required: true,
            minLength: {
              value: 5,
              message: "제목을 5글자 이상 입력해주세요.",
            },
          })}
          required
          label="제목"
          name="name"
          kind="text"
          placeholder="제목"
        />
        <Input
          register={register("price", {
            required: true,
            valueAsNumber: true, //폼은 기본적으로 모든 입력값 string으로 받음
            //리액트훅폼으로 값 number 타입으로 변경
          })}
          required
          label="가격"
          name="price"
          kind="price"
          placeholder="0"
        />
        <Textarea
          register={register("description", {
            required: true,
            minLength: {
              value: 5,
              message: "내용을 5글자 이상 입력해주세요.",
            },
          })}
          required
          label="자세한 설명"
          name="description"
          placeholder="올릴 게시글 내용을 작성해 주세요.&#10;(판매 금지 물품은 게시가 제한될 수 있어요.)&#10;신뢰할수 있는 거래를 위해 자세히 적어주세요."
        />
        <Button loading={loading} text="라이브 시작하기" />
      </form>
    </Layout>
  );
};

export default Create;
