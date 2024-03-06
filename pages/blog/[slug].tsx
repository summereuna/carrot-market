import { readdirSync } from "fs";
import matter from "gray-matter";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkHtml from "remark-html";
import Layout from "@/components/Layout";
import { BlogPostData } from ".";
import Seo from "@/components/Seo";

//3. Incremental Static Regeneration(ISR)

//리액트 JS에게 태그로 보이게 innerHTML 실행해달라고 해야함
//리액트JS는 텍스트를 받는데 그 텍스트가 코드면 실행시키지 않는다.
//하지만 이 post는 신뢰할 수 있는 환경에서 온거니까.. html코드로 생각하고 실행시켜달라고 햏야한다.
// dangerouslySetInnerHTML 프롬에 { __html: post } 객체 보내서 innerHTML 사용할 수 있게 하기
const Post: NextPage<{ post: string; postData: BlogPostData }> = ({
  post,
  postData,
}) => {
  return (
    <Layout canGoBack title="블로그">
      <Seo
        title={`${postData.title} | 블로그`}
        description={postData.excerpt}
      />
      <div className="px-10 pb-5 text-gray-800">
        <div className="py-10 border-b space-y-5 flex flex-col text-center items-center">
          <div>
            <h1 className="text-lg font-semibold text-orange-500">
              {postData.title}
            </h1>
            <h2>{postData.excerpt}</h2>
          </div>
          <div className="text-xs flex space-x-2">
            <span>📝 {postData.author}</span>
            <span>|</span>
            <span>{postData.date}</span>
          </div>
        </div>

        <div
          className="blog-post-content my-10"
          dangerouslySetInnerHTML={{ __html: post }}
        />
      </div>
    </Layout>
  );
};

//1. [slug].tsx 페이지에서는 getStaticPath가 필요하다 => 생성할 페이지 미리 알려주기 위해
//getStaticPaths는, [].tsx 동적인 url이 있는 페이지에서 getStaticProps을 사용할 때 필요하다.
//즉, url 안에 변수가 있는 Static 페이지를 생성하려고 할 때 필요하다.
//nextJS가 정적 페이지를 미리 빌드할 수 있도록 이런 페이지를 몇개나 생성해야 하는지 알려줘야 한다.

//이런 방법은 다이나믹 url을 사용하여 데이터베이스에서 데이터를 찾아와서 페이지를 렌더링하는 일반적인 static 페이지와는 다르다.
//○  (Static)  automatically rendered as static HTML (uses no initial props)

//●  (SSG)     automatically generated as static HTML + JSON (uses getStaticProps)
//이 static 페이지에서는 사용자가 페이지에 접근하기 전, 데이터가 이미 들어와 있다.

export const getStaticPaths: GetStaticPaths = async () => {
  //`paths` must be an array of strings or objects of shape { params: [key: string]: string }
  //paths: Array<string | { params: { [key: string]: string } }>,

  // /posts 디렉토리 안에 있는 file 읽고 path 생성하기
  const fileName = readdirSync("./posts").map((file) => {
    // console.log(file);
    const [name, _] = file.split(".");
    return { params: { slug: name } };
    //map 함수 사용해 객체 리턴하는데, 이 객체가 가진 params 객체 안에 slug를 넣고 파일 이름을 넣어주면 됨
    // => 이렇게 해서 nextJS에게 이런 path를 가지고 있고, 이 경로를 가진 페이지를 생성해야 한다고 미리 알려줄 수 있다.
  });

  return {
    paths: fileName,
    fallback: false,
  };
};

//데이터를 어떤 다른 소스에서 가지고 올 때는 getStaticProps를 사용
//여기에서는 다른 소스(/posts 디렉토리의 마크다운 파일)에서 데이터를 가져오고 있음

//2. getStaticProps에서 slug에 접근하는 방법 (dynamic getStaticProps)
//=> getStaticProps은 NextJs가 production 하기 위해 프로젝트를 build할 때 호출된다.
//그리고 getStaticProps는 getStaticPaths에서 반환되는 모든 path를 한 번씩 호출한다.
export const getStaticProps: GetStaticProps = async (context) => {
  console.log(context.params?.slug);
  //파일 읽어서 내용 추출
  const { content, data } = matter.read(`./posts/${context.params?.slug}.md`);

  //mark down string => remark 플러그인 사용해 html로 바꾸기
  const { value } = await unified()
    .use(remarkParse)
    .use(remarkHtml)
    .process(content);

  return {
    props: { post: value, postData: data },
  };
};

export default Post;
