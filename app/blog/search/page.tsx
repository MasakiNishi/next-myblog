"use client";

// const
import PostConst from "../../../constants/PostConst";
// service
import PostService from "../../../services/PostService";
// component
import PostList from "../../../components/molecules/postList/PostList";
import Pagination from "../../../components/molecules/pagination/Pagination";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
// type
import PostListType from "../../../types/PostListType";

const Search = () => {
  const searchParams = useSearchParams();
  const queryParam = searchParams.get("query") || "";

  const pageParam = searchParams.get("page");
  const currentPage = pageParam ? parseInt(pageParam) : 1;

  const [postList, setPostList] = useState<PostListType[]>([]);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const [fetchedPostList, fetchedTotal] = await PostService.getList({
        page: currentPage,
        search: queryParam,
      });
      setPostList(fetchedPostList);
      setTotal(fetchedTotal);
      setIsLoading(false);
    };

    fetchData();
  }, [currentPage, queryParam]);

  return (
    <div className="flex flex-col flex-nowrap w-main mx-auto p-4 sm:p-10">
      <h1 className="text-center sm:text-left font-bold text-gray-600 mb-6 sm:mb-9">
        Blog - "{queryParam}"
      </h1>
      {queryParam === "" ? (
        <p>検索キーワードを入力してください。</p>
      ) : isLoading ? (
        <p>検索中...</p>
      ) : postList.length === 0 ? (
        <p>
          記事が見つかりませんでした。別の検索キーワードを入力してください。
        </p>
      ) : (
        <>
          {postList.map((post) => (
            <div key={post.id}>
              <PostList post={post} />
            </div>
          ))}
          {postList.length > 0 && (
            <Pagination
              total={total}
              sizePerPage={PostConst.sizePerPage}
              currentPage={currentPage}
              path="/blog/search"
              query={queryParam}
            />
          )}
        </>
      )}
    </div>
  );
};

export default Search;
