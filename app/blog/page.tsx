// type
import PostListType from "../../types/PostListType";
// service
import PostService from "../../services/PostService";
// component
import PostList from "../../components/molecules/postList/PostList";

const Blog = async () => {
  const postList: PostListType[] = await PostService.getList({});

  return (
    <div className="flex flex-col flex-nowrap w-main mx-auto p-10">
      <h1 className="text-2xl font-bold text-gray-600 mb-9">Blog</h1>
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
