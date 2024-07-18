// type
import PostType from "../../../types/PostType";
// component
import PostListImage from "../../atoms/post/image/PostListImage";
import PostListCategory from "../../atoms/post/label/PostListCategory";
import PostListTitle from "../../atoms/post/text/PostListTitle";
import PostListSubTitle from "../../atoms/post/text/PostListSubTitle";
import PostListDate from "../../atoms/post/text/PostListDate";
import Link from "next/link";

const PostList = ({ post }: { post: PostType }) => {
  return (
    <article className="mb-9 group">
      <div className="flex items-center">
        <Link href={`/blog/${post.slug}`}>
          <PostListImage
            src={post.featuredImage.url}
            alt=""
            className="w-[90px] h-[90px] group-hover:rounded-[50%_90%] transition-all duration-500 ease-in-out"
          />
        </Link>
        <div className="ml-8">
          <div className="flex items-baseline mb-2">
            <PostListCategory href={`/category/${post.category.slug}`}>
              {post.category.name}
            </PostListCategory>
            <Link href={`/blog/${post.slug}`}>
              <PostListDate>{post.date.split("T")[0]}</PostListDate>
            </Link>
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
