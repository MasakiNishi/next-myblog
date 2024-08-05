// type
import CategoryType from "../../types/CategoryType";
// service
import PostService from "../../services/PostService";
// component
import HomeIcon from "@mui/icons-material/Home";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import IconButton from "@mui/material/IconButton";
import Link from "next/link";
import CategoryFilter from "../molecules/actionsBar/CategoryFilter";
import SiteSearch from "../molecules/actionsBar/SiteSearch";

const ActionsBar = async () => {
  const categoryList: CategoryType[] | null =
    await PostService.getCategoryList();

  return (
    <div className="z-10 px-3 lg:py-6 lg:px-0 h-[60px] lg:h-auto w-full lg:w-[60px] fixed left-0 bottom-0 lg:right-0 lg:top-0 lg:left-auto flex flex-row lg:flex-col justify-between bg-white after:content-[''] after:absolute after:top-0 lg:after:top-[20px] after:left-[1rem] lg:after:left-0 after:bottom-0 lg:after:bottom-[20px] after:right-[1rem] lg:after:right-0 after:h-[1px] lg:after:h-auto lg:after:w-[1px] after:bg-customGray">
      <div className="flex flex-row lg:flex-col items-center space-x-4 lg:space-x-0 lg:space-y-4">
        <Link href="/" className="flex items-center justify-center">
          <IconButton aria-label="ホーム" title="ホーム">
            <HomeIcon className="text-gray-800" />
          </IconButton>
        </Link>
        <CategoryFilter categoryList={categoryList} />
        <SiteSearch />
      </div>
      <div className="flex flex-row lg:flex-col items-center lg:space-y-4 space-x-4 lg:space-x-0">
        <a
          href="#top"
          aria-label="スクロールトップ"
          title="スクロールトップ"
          className="flex items-center justify-center"
        >
          <IconButton aria-label="スクロールトップ" title="スクロールトップ">
            <ArrowUpwardIcon className="text-gray-800" />
          </IconButton>
        </a>
      </div>
    </div>
  );
};

export default ActionsBar;
