import Button from "@/components/button";
import Input from "@/components/input";
import Layout from "@/components/layout";
import useUser from "@/libs/client/useUser";
import useMutation from "@/libs/server/useMutation";
import type { NextPage } from "next";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

interface EditProfileForm {
  name?: string;
  email?: string;
  phone?: string;
  formErrors?: string;
}

interface EditProfileResponse {
  ok: boolean;
  error?: string;
}
const EditProfile: NextPage = () => {
  const { user } = useUser();

  const [editProfile, { data, loading, error }] =
    useMutation<EditProfileResponse>(`/api/users/me`);

  const {
    register,
    setValue,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<EditProfileForm>();

  //user가 있거나 변경되면 setValue함수로 email폼에 user.email 자동으로 채우기
  useEffect(() => {
    if (user?.name) setValue("name", user.name);
    if (user?.email) setValue("email", user.email);
    if (user?.phone) setValue("phone", user.phone);
  }, [user, setValue]);

  const onValid = ({ name, email, phone }: EditProfileForm) => {
    if (loading) return;
    // 이메일/폰 모두 입력 안한 경우
    if (email === "" && phone === "" && name === "") {
      return setError("formErrors", {
        message: "이메일 혹은 전화번호 중 하나를 입력하세요.",
      });
    }

    //console.log({ email, phone });
    editProfile({ email, phone, name });
  };

  //editProfile로 뮤테이션한 data 지켜보고 data 변경될 때마다 바뀌기
  useEffect(() => {
    if (data && !data.ok) {
      return setError("formErrors", {
        message: data.error,
      });
    }
  }, [data, setError]);

  return (
    <Layout canGoBack title="프로필">
      <form onSubmit={handleSubmit(onValid)} className="py-5 px-4 space-y-4">
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
          register={register("name")}
          required={false}
          label="이름"
          name="name"
          kind="text"
          placeholder="이름을 입력하세요."
        />
        <Input
          register={register("email")}
          required={false}
          label="이메일 주소"
          name="email"
          kind="email"
          placeholder="이메일 주소를 입력하세요."
        />
        <Input
          register={register("phone")}
          required={false}
          label="휴대전화 번호"
          name="phone"
          kind="phone"
        />
        {errors.formErrors ? (
          <span className="my-2 text-red-500 font-medium block">
            {errors.formErrors.message}
          </span>
        ) : null}
        <Button
          onClick={() => clearErrors()}
          text="프로필 수정하기"
          loading={loading}
        />
      </form>
    </Layout>
  );
};

export default EditProfile;
