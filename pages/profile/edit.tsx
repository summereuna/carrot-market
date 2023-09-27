import Button from "@/components/button";
import Input from "@/components/input";
import Layout from "@/components/layout";
import type { NextPage } from "next";

const EditProfile: NextPage = () => {
  return (
    <Layout canGoBack title="프로필">
      <div className="py-5 px-4 space-y-4">
        <div className="flex items-center space-x-3">
          <div className="w-14 h-14 rounded-full bg-slate-300" />
          <label
            htmlFor="picture"
            className="cursor-pointer py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 text-gray-700"
          >
            수정
            <input
              id="picture"
              type="file"
              className="hidden"
              accept="image/*"
            />
          </label>
        </div>
        <Input
          label="이메일 주소"
          name="email"
          kind="email"
          placeholder="이메일 주소를 입력하세요."
        />
        <Input label="휴대전화 번호" name="phone" kind="phone" />
        <Button text="프로필 수정하기" />
      </div>
    </Layout>
  );
};

export default EditProfile;
