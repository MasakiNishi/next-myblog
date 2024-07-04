import PostService from "../services/PostService";
import PostType from "../types/PostType";

const Home = async () => {
  const staticPostList: PostType[] = await PostService.getList();

  return (
    <div>
      {staticPostList.map((post) => (
        <p key={post.id}>{post.title}</p>
      ))}
    </div>
  );
};

export default Home;
