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
    <article className="shadow-sm shadow-gray-200">
      <div>
        <Link href={`/blog/${post.slug}`}>
          <PostListImage
            src={post.featuredImage.url}
            alt=""
            className="w-full h-56"
          />
        </Link>
      </div>
      <div className="py-4 px-5">
        <div className="flex mb-2">
          <div className="mr-2">
            <Link href={`/category/${post.category.slug}`}>
              <PostListCategory>{post.category.name}</PostListCategory>
            </Link>
          </div>
          <PostListDate>{post.date}</PostListDate>
        </div>
        <div className="mb-2">
          <Link href={`/blog/${post.slug}`}>
            <PostListTitle>{post.title}</PostListTitle>
          </Link>
        </div>
        <div className="mb-2">
          <PostListSubTitle>{post.subTitle}</PostListSubTitle>
        </div>
      </div>
    </article>
  );
};

export default PostList;
