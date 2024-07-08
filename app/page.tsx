// service
import PostService from "../services/PostService";
// type
import PostType from "../types/PostType";
// component
import Image from "next/image";

const Home = async () => {
  const staticPostList: PostType[] = await PostService.getList();

  return (
    <div className="flex">
      {staticPostList.map((post) => (
        <div key={post.id} className="w-1/3 p-4">
          <article className="shadow-sm shadow-gray-200 {post.category}">
            <div>
              <img
                className="w-full h-56 object-cover"
                src={post.featuredImage.url}
                alt={post.featuredImage.alt}
              />
            </div>
            <div className="py-4 px-5">
              <span>{post.category.name}</span>
              <h1 className="font-bold">{post.title}</h1>
              <p>{post.subtitle}</p>
              <span>{post.date}</span>
            </div>
          </article>
        </div>
      ))}
    </div>
  );
};

export default Home;
