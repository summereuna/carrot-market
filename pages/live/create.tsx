import Button from "@/components/button";
import Input from "@/components/input";
import Layout from "@/components/layout";
import type { NextPage } from "next";

const Create: NextPage = () => {
  return (
    <Layout canGoBack title="라이브">
      <div className="px-4 py-10 space-y-5">
        <Input label="제목" name="text" kind="text" placeholder="제목" />
        <Input label="가격" name="price" kind="price" placeholder="0" />
        <div>
          <label
            htmlFor="description"
            className="mb-1 block text-sm font-semibold text-gray-700"
          >
            자세한 설명
          </label>
          <div>
            <textarea
              id="description"
              rows={4}
              placeholder="올릴 게시글 내용을 작성해 주세요.&#10;(판매 금지 물품은 게시가 제한될 수 있어요.)&#10;신뢰할수 있는 거래를 위해 자세히 적어주세요."
              className="mt-1 shadow-sm w-full placeholder-gray-400  border-gray-300 focus:outline-none focus:ring-orange-400 focus:border-orange-400 rounded-md "
            />
          </div>
        </div>
        <Button text="라이브 시작하기" />
      </div>
    </Layout>
  );
};

export default Create;
