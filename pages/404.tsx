import Layout from "@/components/Layout";

export default function Custom404() {
  return (
    <Layout canGoBack title="404 Error">
      <div className="flex flex-col items-center  py-20 space-y-5">
        <h1 className="font-semibold text-xl">404</h1>
        <h2 className="text-base">페이지를 찾을 수 없습니다.</h2>
      </div>
    </Layout>
  );
}
