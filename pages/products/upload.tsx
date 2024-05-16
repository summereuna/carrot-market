import Button from "@/components/Button";
import Input from "@/components/Input";
import Layout from "@/components/Layout";
import Seo from "@/components/Seo";
import Textarea from "@/components/Textarea";
import fileUploader from "@/libs/client/fileUploader";
import useMutation from "@/libs/client/useMutation";
import { Product } from "@prisma/client";
import type { NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

interface UploadProductForm {
  name: string;
  price: number;
  description: string;
  productImage: FileList;
  formErrors?: string;
}

// products/upload 페이지에서 useMutation하면 응답 결과로 data.ok 반환받음
interface UploadProductMutationResult {
  ok: boolean;
  product: Product; //프리즈마 클라이언트에서 오는 type 사용가능
}

const Upload: NextPage = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<UploadProductForm>();

  const [uploadProduct, { loading, data, error }] =
    useMutation<UploadProductMutationResult>("/api/products");

  const onValid = async ({
    name,
    price,
    description,
    productImage,
  }: UploadProductForm) => {
    //로딩 중이면 멈춤
    if (loading) return;

    //로딩중 아니면 uploadProduct() 실행하여 데이터 받아서 뮤테이션 하기

    if (productImage && productImage.length > 0) {
      //클라우디너리로 파일 업로드
      const presetName = process.env.NEXT_PUBLIC_CLOUDINARY_PRODUCT_PRESET_NAME;
      const productImageUrl = await fileUploader(
        productImage[0],
        `${presetName}`
      );
      uploadProduct({
        name,
        price,
        description,
        productImageUrl,
      });
    } else {
      return setError("formErrors", {
        message: "상품의 사진을 업로드하세요",
      });
    }
  };

  useEffect(() => {
    if (data?.ok) {
      router.replace(`/products/${data.product.id}`);
      //상품 업로드 끝나면 상품 상세 페이지로 이동
    }
  }, [data, , router]);

  const productImageFileList = watch("productImage");
  const [productImagePreview, setProductImagePreview] = useState("");
  useEffect(() => {
    if (productImageFileList && productImageFileList.length > 0) {
      const productImageFile = productImageFileList[0];
      setProductImagePreview(URL.createObjectURL(productImageFile));
    }
  }, [productImageFileList]);

  return (
    <Layout canGoBack title="상품 업로드">
      <Seo
        title="상품 업로드 글쓰기 | 중고거래"
        description="네이버후드 중고거래 상품 업로드 글쓰기"
      />
      <form onSubmit={handleSubmit(onValid)}>
        <div className="px-4 py-2 space-y-5">
          {productImagePreview ? (
            <div className="relative -z-10 w-full h-48 ">
              <Image
                src={productImagePreview}
                alt="preview"
                fill={true}
                className="text-gray-600 rounded-md mb-8 object-contain"
                priority
              />
            </div>
          ) : (
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
              <input
                {...register("productImage")}
                id="productImage"
                type="file"
                className="hidden"
                accept="image/*"
              />
            </label>
          )}
          <Input
            register={register("name", { required: true })}
            label="제목"
            name="text"
            kind="text"
            placeholder="제목"
            required
          />
          <Input
            register={register("price", {
              required: true,
              valueAsNumber: true,
            })}
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
          {errors.formErrors ? (
            <span className="my-2 text-red-500 font-medium block">
              {errors.formErrors.message}
            </span>
          ) : null}
          <Button
            loading={loading}
            text="작성 완료"
            onClick={() => clearErrors()}
          />
        </div>
      </form>
    </Layout>
  );
};

export default Upload;
