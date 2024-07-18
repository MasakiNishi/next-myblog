import type { NextPage } from "next";
// type
import PostType from "../types/PostType";
// service
import PostService from "../services/PostService";
// component
import PostList from "../components/molecules/post/PostList";
import Layout from "../components/templates/Layout";

const Home = async () => {
  const postList: PostType[] = await PostService.getList();

  return (
    <Layout>
      <div className="flex flex-wrap w-main mx-auto">
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
