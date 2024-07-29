// const
import PostConst from "../../../../constants/PostConst";
// service
import PostService from "../../../../services/PostService";
// component
import PostList from "../../../../components/molecules/postList/PostList";
import Pagination from "../../../../components/molecules/pagination/Pagination";

interface ListPageProps {
  params: {
    number: string;
  };
}

const Blog = async ({ params }: ListPageProps) => {
  const currentPage = parseInt(params.number);
  const [postList, total] = await PostService.getList({
    page: currentPage,
  });

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
      <Pagination
        total={total}
        sizePerPage={PostConst.sizePerPage}
        currentPage={currentPage}
        path="/blog/page"
      />
    </div>
  );
};

export default Blog;
