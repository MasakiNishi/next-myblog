// type
import PostListType from "../types/PostListType";
// service
import PostService from "../services/PostService";
// component
import PostList from "../components/molecules/postList/PostList";
import Layout from "../components/templates/Layout";

const Home = async () => {
  const postList: PostListType[] = await PostService.getList();

  return (
    <Layout>
      <div className="flex flex-wrap w-main mx-auto p-10">
        {postList!.map((post) => {
          return (
            <div key={post.id}>
              <PostList post={post} />
            </div>
          );
        })}
      </div>
    </Layout>
  );
};

export default Home;
