import { notFound } from "next/navigation";
// type
import PostType from "../../../types/PostType";
// service
import PostService from "../../../services/PostService";
// component
import PostFeatureImage from "../../../components/atoms/post/image/PostFeatureImage";
import Layout from "../../../components/templates/Layout";
import PostCategory from "../../../components/atoms/post/text/PostCategory";
import PostDate from "../../../components/atoms/post/text/PostDate";
import PostTitle from "../../../components/atoms/post/text/PostTitle";
import PostSubTitle from "../../../components/atoms/post/text/PostSubTitle";
import PostProfile from "../../../components/molecules/post/PostProfile";

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
      <article className="w-main mx-auto max-w-[50em] p-14">
        <div className="mb-4 text-sm">
          <PostCategory href={post.category.slug}>
            {post.category.name}
          </PostCategory>
        </div>
        <div className="mb-5">
          <PostTitle>{post.title}</PostTitle>
          <PostSubTitle>{post.subTitle}</PostSubTitle>
        </div>
        <div className="flex mb-7 text-sm">
          <PostDate dateTime={post.date.split("T")[0]}>
            投稿日: {post.date.split("T")[0]}
          </PostDate>
          <PostDate dateTime={post.date.split("T")[0]}>
            更新日: {post.modifiedDate.split("T")[0]}
          </PostDate>
        </div>
        <div className="mb-7 -mx-14 flex justify-center">
          <PostFeatureImage
            src={post.featuredImage.url}
            alt={post.featuredImage.alt}
          />
        </div>
        <div
          id="content"
          dangerouslySetInnerHTML={{ __html: post.content }}
        ></div>
        <div>
          <PostProfile />
        </div>
      </article>
    </Layout>
  );
};

export default PostPage;
