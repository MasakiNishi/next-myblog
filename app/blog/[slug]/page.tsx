import { notFound } from "next/navigation";
// type
import PostType from "../../../types/PostType";
// service
import PostService from "../../../services/PostService";
// component
// import PostFeatureImage from "../../../components/atoms/post/image/PostFeatureImage";
import Layout from "../../../components/templates/Layout";
// import PostCategory from "../../../components/atoms/post/text/PostCategory";
// import PostDate from "../../../components/atoms/post/text/PostDate";
// import PostHeading from "../../../components/atoms/post/text/PostHeading";
import Link from "next/link";

interface PostPageProps {
  params: {
    slug: string;
  };
}

const PostPage = async ({ params }: PostPageProps) => {
  const post: PostType | null = await PostService.getOne({ id: params.slug });

  if (!post) {
    notFound();
    return null; // 実際には返されないが、TypeScriptの型エラーを防ぐため
  }

  return (
    <Layout>
      <div className="w-main mx-auto">
        <article>
          <div className="mb-4">
            {/* <PostFeatureImage
              src={post.featuredImage.url}
              alt=""
              className="w-full h-96"
            /> */}
          </div>
          <div className="flex mb-4">
            <div className="mr-3">
              <Link href={post.category.slug}>
                {/* <PostCategory>{post.category.name}</PostCategory> */}
                {post.category.name}
              </Link>
            </div>
            {/* <PostDate>{post.date}</PostDate> */}
            {post.date}
          </div>
          <div className="mb-6">
            {/* <PostHeading>{post.title}</PostHeading> */}
            {post.title}
            {post.subTitle}
          </div>
          <div dangerouslySetInnerHTML={{ __html: post.content }}></div>
        </article>
      </div>
    </Layout>
  );
};

export default PostPage;
