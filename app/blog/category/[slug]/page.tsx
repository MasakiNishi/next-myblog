// type
import PostListType from "../../../../types/PostListType";
// service
import PostService from "../../../../services/PostService";
// component
import PostList from "../../../../components/molecules/postList/PostList";

interface CategoryPageProps {
  params: {
    slug: string;
  };
}

const Blog = async ({ params }: CategoryPageProps) => {
  const slug = params.slug;
  const categoryId = await PostService.getCategoryIdBySlug({ slug });
  const postList: PostListType[] = await PostService.getList({ categoryId });

  return (
    <div className="flex flex-col flex-nowrap w-main mx-auto p-10">
      {postList!.map((post) => {
        return (
          <div key={post.id}>
            <PostList post={post} />
          </div>
        );
      })}
    </div>
  );
};

export default Blog;
