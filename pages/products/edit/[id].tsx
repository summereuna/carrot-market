import Button from "@/components/Button";
import Input from "@/components/Input";
import Layout from "@/components/Layout";
import Seo from "@/components/Seo";
import Textarea from "@/components/Textarea";
import fileUploader from "@/libs/client/fileUploader";
import useUpdate from "@/libs/client/useUpdate";
import { Product } from "@prisma/client";
import type {
  NextPage,
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
} from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import useSWR from "swr";
import client from "@/libs/server/client";
import { ProductsResponse } from "@/pages";
import { ProductDetailResponse } from "../[id]";

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

const ProductEdit: NextPage = ({
  id,
  fallbackData,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const router = useRouter();
  //✅ 기존 데이터 GET
  //프로덕트 데이터
  const {
    data: prevProduct,
    mutate: mutateProduct,
    isLoading: isLoadingPrevProduct,
  } = useSWR<ProductDetailResponse>(`/api/products/${id}`, {
    fallbackData,
    revalidateOnMount: false,
  });

  //모든 프로덕트 데이터
  const { data: allProducts, mutate: mutateAllProducts } =
    useSWR<ProductsResponse>(`/api/products`);

  // ✅ PUT
  //프로덕트 업데이트하기
  const [updateProduct, { loading, data, error }] =
    useUpdate<UploadProductMutationResult>(`/api/products/${router.query.id}`);

  const prevProductData = prevProduct?.product as Product;
  // console.log("✅", prevProductData);
  // console.log("🔥", fallbackData.product.name);

  // 📝 useForm
  //수정폼
  const {
    register,
    handleSubmit,
    watch,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<UploadProductForm>({
    defaultValues: {
      description: fallbackData.product.description,
      name: fallbackData.product.name,
      price: fallbackData.product.price,
    },
  });

  const onValid = async ({
    name,
    price,
    description,
    productImage,
  }: UploadProductForm) => {
    //로딩 중이면 멈춤
    if (loading) return;

    if (
      productImage.length === 0 &&
      fallbackData.product.name === name &&
      fallbackData.product.price === price &&
      fallbackData.product.description === description
    ) {
      return setError("formErrors", {
        message:
          "수정한 항목이 없습니다. 수정할 항목이 없으면 취소 버튼을 누르세요.",
      });
    }

    if (fallbackData.product.image && productImage.length === 0) {
      //console.log("이미지 그대로");
      //db 업데이트
      updateProduct({
        name,
        price,
        description,
        productImageUrl: fallbackData.product.image,
      });
    } else if (productImage && productImage.length > 0) {
      // console.log("이미지 수정");
      //클라우디너리로 파일 업로드
      const presetName = process.env.NEXT_PUBLIC_CLOUDINARY_PRODUCT_PRESET_NAME;
      const productImageUrl = await fileUploader(
        productImage[0],
        `${presetName}`
      );

      //db 업데이트
      updateProduct({
        name,
        price,
        description,
        productImageUrl,
      });
    }
  };

  useEffect(() => {
    if (data?.ok) {
      //상품 업로드 끝나면 상품 상세 페이지로 이동
      router.replace(`/products/${data.product.id}`, undefined, {
        shallow: true,
      });
    }
  }, [data, router]);

  const productImageFileList = watch("productImage");
  const [productImagePreview, setProductImagePreview] = useState("");

  useEffect(() => {
    if (productImageFileList && productImageFileList.length > 0) {
      const productImageFile = productImageFileList[0];
      setProductImagePreview(URL.createObjectURL(productImageFile));
    }
  }, [productImageFileList]);

  return (
    <Layout canGoBack title="상품 수정">
      <Seo
        title="상품 수정 글쓰기 | 중고거래"
        description="네이버후드 중고거래 상품 수정 글쓰기"
      />
      <form onSubmit={handleSubmit(onValid)}>
        <div className="px-4 py-2 space-y-5">
          <label className="flex items-center justify-center text-gray-600 hover:text-orange-500 border-2 border-dashed border-gray-300 w-full h-48 rounded-md mb-8 cursor-pointer hover:border-orange-500">
            <div className="relative -z-10 w-full h-48 flex justify-center items-center">
              {productImagePreview ? (
                <Image
                  src={productImagePreview}
                  alt="preview"
                  fill={true}
                  className="text-gray-600 rounded-md mb-8 object-contain"
                  priority
                />
              ) : (
                <Image
                  alt="preProductImageView"
                  src={fallbackData.product.image}
                  fill={true}
                  className="text-gray-600 rounded-md mb-8 object-contain"
                  priority
                ></Image>
              )}
              <div className="z-10">
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
              </div>
            </div>
            <input
              {...register("productImage")}
              id="productImage"
              type="file"
              className="hidden"
              accept="image/*"
            />
          </label>
          <Input
            register={register("name", {
              required: true,
            })}
            label="제목"
            name="text"
            kind="text"
            placeholder="제목을 입력하세요 (5글자 이상 입력하기)"
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
            <span className="my-2 text-red-500 font-medium block text-sm">
              {errors.formErrors.message}
            </span>
          ) : null}
          <Button
            loading={loading}
            text="수정 완료"
            onClick={() => clearErrors()}
          />
          <Button
            text="취소"
            onClick={() => {
              clearErrors();
              router.back();
            }}
          />
        </div>
      </form>
    </Layout>
  );
};

export default ProductEdit;

export const getStaticPaths: GetStaticPaths = async () => {
  //   const products = await client.product.findMany();
  //   //   ({
  //   //     // include: {
  //   //     //   _count: {
  //   //     //     select: { wishes: true },
  //   //     //   },
  //   //     //   reservation: { select: { id: true } },
  //   //     //   review: { select: { id: true } },
  //   //     // },
  //   //     // orderBy: { created: "desc" },
  //   // })
  //   const paths = products.map((product) => ({
  //     params: {
  //       id: product.id,
  //     },
  //   }));

  //   return { paths, fallback: false };
  return {
    paths: [],
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const id = context.params?.id;
  // console.log(context);

  const product = await client.product.findUnique({
    where: {
      id: +id!.toString(),
    },
  });

  if (!product) {
    return { notFound: true };
  }
  // if (product.userId !== user) {
  //   return res.status(404).json({
  //     ok: false,
  //     error: "상품이 존재하지 않습니다.",
  //   });
  // }

  return {
    props: {
      id: product.id,
      fallbackData: {
        product: JSON.parse(JSON.stringify(product)),
      },
    },
    revalidate: 1,
  };
};
