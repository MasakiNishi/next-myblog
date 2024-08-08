// type
import PostListType from "../../../types/PostListType";
// component
import PostListImage from "../../atoms/postList/image/PostListImage";
import PostListCategory from "../../atoms/postList/text/PostListCategory";
import PostListTitle from "../../atoms/postList/text/PostListTitle";
import PostListSubTitle from "../../atoms/postList/text/PostListSubTitle";
import PostListDate from "../../atoms/postList/text/PostListDate";
import Link from "next/link";

const PostList = ({ post }: { post: PostListType }) => {
  return (
    <article className="mb-6 sm:mb-9 group">
      <div className="flex items-center">
        <Link href={`/blog/${post.slug}`}>
          <PostListImage
            featuredImage={post.featuredImage}
            className="w-9 h-9 sm:w-[90px] sm:h-[90px] group-hover:rounded-[50%_90%] transition-all duration-500 ease-in-out"
          />
        </Link>
        <div className="ml-3 sm:ml-8">
          <div className="flex items-baseline mb-2">
            <PostListCategory href={`/blog/category/${post.category.slug}`}>
              {post.category.name}
            </PostListCategory>
            <PostListDate>{post.date.split("T")[0]}</PostListDate>
          </div>
          <Link href={`/blog/${post.slug}`}>
            <PostListTitle>{post.title}</PostListTitle>
            {post.subTitle && (
              <PostListSubTitle>{post.subTitle}</PostListSubTitle>
            )}
          </Link>
        </div>
      </div>
    </article>
  );
};

export default PostList;
