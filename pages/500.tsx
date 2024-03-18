import Layout from "@/components/Layout";

export default function Custom500() {
  return (
    <Layout canGoBack title="500 Error">
      <div className="flex flex-col items-center  py-20 space-y-5">
        <h1 className="font-semibold text-xl">500 Server Error</h1>
        <h2 className="text-base">서버에 문제가 발생했습니다.</h2>
      </div>
    </Layout>
  );
}
