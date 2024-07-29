// const
import PostConst from "../../../../../constants/PostConst";
// service
import PostService from "../../../../../services/PostService";
// component
import PostList from "../../../../../components/molecules/postList/PostList";
import Pagination from "../../../../../components/molecules/pagination/Pagination";

interface CategoryPageProps {
  params: {
    slug: string;
    page: string;
  };
}

const Blog = async ({ params }: CategoryPageProps) => {
  const slug = params.slug;
  const categoryId = await PostService.getCategoryIdBySlug({ slug });

  const currentPage = parseInt(params.page);
  const [postList, total] = await PostService.getList({
    page: currentPage,
    categoryId,
  });

  const categoryName = slug.charAt(0).toUpperCase() + slug.slice(1);

  return (
    <div className="flex flex-col flex-nowrap w-main mx-auto p-10">
      <h1 className="text-2xl font-bold text-gray-600 mb-9">
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
        path={`/blog/category/${slug}`}
      />
    </div>
  );
};

export default Blog;
