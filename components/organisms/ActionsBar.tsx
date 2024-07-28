// type
import CategoryType from "../../types/CategoryType";
// service
import PostService from "../../services/PostService";
// component
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import IconButton from "@mui/material/IconButton";
import Link from "next/link";
import CategoryFilter from "../molecules/actionsBar/CategoryFilter";

const ActionsBar = async () => {
  const categoryList: CategoryType[] | null =
    await PostService.getCategoryList();

  return (
    <div className="w-[60px] py-6 fixed right-0 top-0 bottom-0 flex flex-col items-center justify-between bg-white after:content-[''] after:absolute after:top-[20px] after:left-0 after:bottom-[20px] after:w-[1px] after:bg-customGray">
      <div className="flex flex-col items-center space-y-4">
        <IconButton className="py-0" aria-label="ホーム" title="ホーム">
          <Link href="/">
            <HomeIcon className="text-gray-800" />
          </Link>
        </IconButton>
        <CategoryFilter categoryList={categoryList} />
        <IconButton
          className="py-0"
          aria-label="ブログ内検索"
          title="ブログ内検索"
        >
          <Link href="/blog/search">
            <SearchIcon className="text-gray-800" />
          </Link>
        </IconButton>
      </div>
      <div className="flex flex-col items-center space-y-4">
        <IconButton
          className="py-0"
          aria-label="スクロールトップ"
          title="スクロールトップ"
        >
          <a
            href="#top"
            aria-label="スクロールトップ"
            title="スクロールトップ"
            className="text-gray-800 hover:text-gray-800"
          >
            <ArrowUpwardIcon />
          </a>
        </IconButton>
      </div>
    </div>
  );
};

export default ActionsBar;
