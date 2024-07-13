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
            <div
              key={post.id}
              className="w-1/3 pr-4 pb-4 [&:nth-of-type(3n)]:pr-0"
            >
              <PostList post={post} />
            </div>
          );
        })}
      </div>
    </Layout>
  );
};

export default Home;
