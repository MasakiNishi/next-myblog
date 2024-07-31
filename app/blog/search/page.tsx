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

  useEffect(() => {
    const fetchData = async () => {
      const [fetchedPostList, fetchedTotal] = await PostService.getList({
        page: currentPage,
        search: queryParam,
      });
      setPostList(fetchedPostList);
      setTotal(fetchedTotal);
    };

    fetchData();
  }, [currentPage, queryParam]);

  return (
    <div className="flex flex-col flex-nowrap w-main mx-auto p-10">
      <h1 className="text-2xl font-bold text-gray-600 mb-9">
        Blog - "{queryParam}"
      </h1>
      {queryParam === "" ? (
        <p>検索キーワードを入力してください。</p>
      ) : (
        <>
          {postList.map((post) => (
            <div key={post.id}>
              <PostList post={post} />
            </div>
          ))}
          <Pagination
            total={total}
            sizePerPage={PostConst.sizePerPage}
            currentPage={currentPage}
            path="/blog/search"
            query={queryParam}
          />
        </>
      )}
    </div>
  );
};

export default Search;
