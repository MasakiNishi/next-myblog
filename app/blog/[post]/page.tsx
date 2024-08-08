import { notFound } from "next/navigation";
// type
import PostType from "../../../types/PostType";
// service
import PostService from "../../../services/PostService";
// component
import PostFeatureImage from "../../../components/atoms/common/image/FeatureImage";
import PostCategory from "../../../components/atoms/post/text/PostCategory";
import PostDate from "../../../components/atoms/post/text/PostDate";
import PostTitle from "../../../components/atoms/common/text/Title";
import PostSubTitle from "../../../components/atoms/post/text/PostSubTitle";
import PostProfile from "../../../components/molecules/post/PostProfile";

interface PostPageProps {
  params: {
    post: string;
  };
}

const PostPage = async ({ params }: PostPageProps) => {
  const post: PostType | null = await PostService.getOne({ id: params.post });

  if (!post) {
    notFound();
    return null; // 実際には返されないが、TypeScriptの型エラーを防ぐため
  }

  return (
    <article className="w-main mx-auto max-w-[50em] p-4 sm:p-14">
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
      {post.featuredImage && (
        <PostFeatureImage
          featuredImage={post.featuredImage}
          className="mb-7 -mx-4 sm:-mx-14 flex justify-center"
        />
      )}
      <div
        id="content"
        dangerouslySetInnerHTML={{ __html: post.content }}
        suppressHydrationWarning={true}
      ></div>
      <div>
        <PostProfile />
      </div>
    </article>
  );
};

export default PostPage;
