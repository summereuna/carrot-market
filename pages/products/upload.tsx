import Button from "@/components/button";
import Input from "@/components/input";
import Layout from "@/components/layout";
import Textarea from "@/components/textarea";
import useMutation from "@/libs/server/useMutation";
import { Product } from "@prisma/client";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

interface UploadProductForm {
  name: string;
  price: number;
  description: string;
  //image: string; //아직 구현 안함
}

// products/upload 페이지에서 useMutation하면 응답 결과로 data.ok 반환받음
interface UploadProductMutationResult {
  ok: boolean;
  product: Product; //프리즈마 클라이언트에서 오는 type 사용가능
}

const Upload: NextPage = () => {
  const { register, handleSubmit } = useForm<UploadProductForm>();

  const [uploadProduct, { loading, data, error }] =
    useMutation<UploadProductMutationResult>("/api/products");

  const onValid = (data: UploadProductForm) => {
    //로딩 중이면 멈춤
    if (loading) return;

    //로딩중 아니면 uploadProduct() 실행하여 데이터 받아서 뮤테이션 하기
    //console.log(data);
    uploadProduct(data);
  };

  const router = useRouter();

  useEffect(() => {
    if (data?.ok) {
      router.push(`/products/${data.product.id}`);
      //상품 업로드 끝나면 상품 상세 페이지로 이동
    }
  }, [data, router]);

  return (
    <Layout canGoBack title="상품 업로드">
      <form onSubmit={handleSubmit(onValid)}>
        <div className="px-4 py-2 space-y-5">
          <label className="flex items-center justify-center text-gray-600 hover:text-orange-500 border-2 border-dashed border-gray-300 w-full h-48 rounded-md mb-8 cursor-pointer hover:border-orange-500">
            <svg
              className="h-12 w-12"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 48 48"
              aria-hidden="true"
            >
              <path
                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            {/* label안에 input 넣고 hidden 하면 label 클릭 시 파일 선택 가능 */}
            <input type="file" className="hidden" />
          </label>
          <Input
            register={register("name", { required: true })}
            label="제목"
            name="text"
            kind="text"
            placeholder="제목"
            required
          />
          <Input
            register={register("price", { required: true })}
            label="가격"
            name="price"
            kind="price"
            placeholder="0"
            required
          />
          <Textarea
            register={register("description", { required: true })}
            label="자세한 설명"
            name="description"
            placeholder="올릴 게시글 내용을 작성해 주세요.&#10;(판매 금지 물품은 게시가 제한될 수 있어요.)&#10;신뢰할수 있는 거래를 위해 자세히 적어주세요."
            required
          />
          <Button text={loading ? "로딩중..." : "작성 완료"} />
        </div>
      </form>
    </Layout>
  );
};

export default Upload;
