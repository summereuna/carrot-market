import { NextPage } from "next";
import { useEffect, useState } from "react";
import { cls } from "../libs/client/utils";
import Button from "@/components/Button";
import Input from "@/components/Input";
import { useForm } from "react-hook-form";
import useMutation from "@/libs/client/useMutation";
import { useRouter } from "next/router";
import Seo from "@/components/Seo";
import SocialLoginButton from "@/components/SocialLoginButton";

interface LoginForm {
  email?: string;
  phone?: string;
}

interface TokenForm {
  token: string;
}

//login 페이지에서 useMutation하면 응답 결과로 data.ok 반환받음
interface MutationResult {
  ok: boolean;
}

const Login: NextPage = () => {
  //유저가 이메일/폰 입력시
  const [enter, { loading, data, error }] =
    useMutation<MutationResult>("/api/users/login");

  //유저가 인증번호(토큰) 입력시
  const [confirmToken, { loading: tokenLoading, data: tokenData }] =
    useMutation<MutationResult>("/api/users/confirm");

  const { register, reset, handleSubmit } = useForm<LoginForm>();
  const { register: tokenRegister, handleSubmit: tokenHandleSubmit } =
    useForm<TokenForm>();

  //email/phone 메소드 바꾸면 email/phone form clear 해줘야 함
  const [method, setMethod] = useState("email");
  const onEmailClick = () => {
    reset();
    setMethod("email");
  };
  const onPhoneClick = () => {
    reset();
    setMethod("phone");
  };

  //form이 정상작동하는지 보기
  //console.log(watch());

  const onValid = (validForm: LoginForm) => {
    enter(validForm);
  };

  const onTokenValid = (validForm: TokenForm) => {
    if (tokenLoading) return; //로딩 참이면 mutation 전송되었단 뜻이니 반환하고
    //토큰 인증 완료
    confirmToken(validForm);
  };

  //컨펌 ok 받으면  res 데이터를 얻는데 그건 token: tokenData에 들었음
  //token을 confirm하는 과정 거쳐 token이 존재한다고 응답 받으면
  //로그인할 준비 된거니까 useRouter 사용하여 홈으로 새로고침되게 하기
  const router = useRouter();

  useEffect(() => {
    if (tokenData?.ok) {
      router.push("/");
    }
  }, [tokenData, router]);

  const githubLogo =
    "M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z";
  const kakaoLogo =
    "M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84";
  return (
    <>
      <Seo title="로그인 | 당근마켓" description="당근마켓 로그인" />
      <div className="mt-16 px-4">
        <h3 className="text-4xl font-bold text-center">지금 우리 동네는? 👀</h3>
        <div className="mt-12">
          {/*data가 undefined일 수 있기 때문에 ? 써주기 */}
          {data?.ok ? (
            <form
              className="flex flex-col mt-8 space-y-4"
              onSubmit={tokenHandleSubmit(onTokenValid)}
            >
              <Input
                register={tokenRegister("token", { required: true })}
                label="인증번호"
                name="token"
                kind="token"
                required
              />

              <Button loading={tokenLoading} text="인증하기" />
            </form>
          ) : (
            <>
              <div className="flex flex-col items-center">
                <h5 className="text-2xl font-bold">지금 로그인하세요.</h5>
                <div className="grid grid-cols-2 gap-16 w-full mt-8 border-b">
                  <button
                    className={cls(
                      "pb-4 font-md border-b-2",
                      method === "email"
                        ? " border-orange-500 text-orange-400"
                        : "border-transparent text-gray-500"
                    )}
                    onClick={onEmailClick}
                  >
                    Email
                  </button>
                  <button
                    className={cls(
                      "pb-4 font-md border-b-2",
                      method === "phone"
                        ? " border-orange-500 text-orange-400"
                        : "border-transparent text-gray-500"
                    )}
                    onClick={onPhoneClick}
                  >
                    Phone
                  </button>
                </div>
              </div>
              <form
                className="flex flex-col mt-8 space-y-4"
                onSubmit={handleSubmit(onValid)}
              >
                {method === "email" ? (
                  <Input
                    register={register("email", { required: true })}
                    label="이메일 주소"
                    name="email"
                    kind="email"
                    placeholder="이메일 주소를 입력하세요."
                    required
                  />
                ) : null}
                {method === "phone" ? (
                  <Input
                    register={register("phone", { required: true })}
                    label="휴대전화 번호"
                    name="phone"
                    kind="phone"
                    required
                  />
                ) : null}
                {method === "email" ? (
                  <Button loading={loading} text="로그인 링크 받기" />
                ) : null}
                {method === "phone" ? (
                  <Button loading={loading} text="일회용 비밀번호 받기" />
                ) : null}
              </form>
            </>
          )}
          <div className="mt-8">
            <div className="relative">
              <div className="absolute w-full border-t border-gray-300" />
              <div className="relative -top-3 text-center">
                <span className="bg-white px-2 text-sm text-gray-500">
                  또는 간편 로그인하기
                </span>
              </div>
            </div>
            <div className="mt-2">
              {/* </Link> */}
              <SocialLoginButton
                api="/api/auth/github"
                title="Github으로 로그인하기"
                logo={githubLogo}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
