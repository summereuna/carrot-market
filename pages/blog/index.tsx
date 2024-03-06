import { GetStaticProps, NextPage } from "next";
import Seo from "@/components/Seo";
import Layout from "@/components/Layout";
import { readFileSync, readdirSync } from "fs";
import matter from "gray-matter";
import Link from "next/link";

export interface BlogPostData {
  title: string;
  date: string;
  author: string;
  category: string;
  tags: string;
  excerpt: string;
  slug: string;
}

const Blog: NextPage<{ posts: BlogPostData[] }> = ({ posts }) => {
  return (
    <Layout title="블로그" hasTabBar>
      <Seo title="블로그 | 당근마켓" description="당근마켓 블로그" />
      <div className="mt-16 px-4">
        <div className="flex items-center space-y-2 py-2 px-3 border-b-2 font-semibold">
          <div className="w-full flex justify-between">
            <div className="space-x-3 flex">
              <div className="w-20 flex justify-center">
                <span>카테고리</span>
              </div>
              <h2>글 제목</h2>
            </div>
            <div className="w-24 flex justify-center">
              <h2>작성 일</h2>
            </div>
          </div>
        </div>
        <ul>
          {posts.map((post, index) => (
            <li
              key={index}
              className="flex items-center space-y-2 py-2 px-3 border-b hover:bg-slate-100"
            >
              <div className="w-full flex justify-between">
                <div className="space-x-3 flex">
                  <div className="w-20 flex justify-center text-orange-500">
                    <span>{post.category}</span>
                  </div>
                  <Link href={`/blog/${post.slug}`}>
                    <span className="cursor-pointer">{post.title}</span>
                  </Link>
                </div>
                <div className="w-24 flex justify-center">
                  <span>{post.date}</span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  //페이지 빌드 시 딱 한번만 실행되어 바뀌시 않으므로 html만 가지고 있음
  //markdown 가져오기

  //nodejs 부분
  // 1. /posts 디렉토리를 읽고, 그 안에 든 .md 파일 가져오기

  // 1-1. 포스트 디렉토리 읽기
  // /pages 바깥에 있지만 같은 선상에 있는 /posts 디렉토리 내부를 읽으려면 "./posts"라고 하면 된다.
  const blogPosts = readdirSync("./posts").map((file) => {
    //1-2. 파일 읽기
    const content = readFileSync(`./posts/${file}`, "utf-8");
    // console.log(content);
    const [fileName, _] = file.split(".");
    // const fileName = file.replace(".md", "");
    //이렇게도 할 수 있음
    // 1-3. gray-matter로 front matter 파싱하고 data 꺼내서 반환하기
    // console.log(matter(content));
    return { ...matter(content).data, slug: fileName };
  });
  //   console.log(blogPosts);
  //gray matter: .md 파일의 front-matter를 파싱할 수 있도록 도와주는 유틸
  console.log(blogPosts);
  return {
    props: { posts: blogPosts.reverse() },
  };
};

export default Blog;

// 스테틱 페이지를 생성할 때 URL의 변수와 함께 생성하는 방법
// getStaticPaths()
// /blog url 갖게 하여 /posts 안에 있는 각 file에 대해서도 정적인(static) 페이지를 생성할 수 있다.
//사용자가 이 페이지로 접근 시 데이터 베이스를 거칠 필요없다. 이미 데이터를 !!이미 가진 페이지
//동적 페이지는 그 페이지 접근시 데이터베이스에서 해당 데이터를 찾아야 했다.

//
//
//

// 미들웨어 (_middleware 사용)
// 중간에 request를 가로챔

// Server (getInitialProps 또는 getServerSideProps 사용)
// 런타임 시 서버 사이드 렌더링

// Static (초기 props를 사용하지 않음)
// static HTML로 자동으로 렌더링됨

// SSG (getStaticProps 사용)
// static HTML + JSON으로 자동으로 생성됨
