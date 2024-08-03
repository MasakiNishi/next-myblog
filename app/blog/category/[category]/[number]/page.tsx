// const
import PostConst from "../../../../../constants/PostConst";
// service
import PostService from "../../../../../services/PostService";
// component
import PostList from "../../../../../components/molecules/postList/PostList";
import Pagination from "../../../../../components/molecules/pagination/Pagination";

interface CategoryPageProps {
  params: {
    category: string;
    number: string;
  };
}

const Blog = async ({ params }: CategoryPageProps) => {
  const category = params.category;
  const categoryId = await PostService.getCategoryIdBySlug({ slug: category });

  const currentPage = parseInt(params.number);
  const [postList, total] = await PostService.getList({
    page: currentPage,
    categoryId,
  });

  const categoryName = category.charAt(0).toUpperCase() + category.slice(1);

  return (
    <div className="flex flex-col flex-nowrap w-main mx-auto p-4 sm:p-10">
      <h1 className="text-center sm:text-left font-bold text-gray-600 mb-6 sm:mb-9">
        Blog - {categoryName}
      </h1>
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
        path={`/blog/category/${category}`}
      />
    </div>
  );
};

export default Blog;
