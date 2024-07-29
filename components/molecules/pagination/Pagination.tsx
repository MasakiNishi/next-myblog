// const
import PaginationConst from "../../../constants/PaginationConst";
// component
import Link from "next/link";
import {
  ArrowBackIosNew as ArrowBackIosNewIcon,
  ArrowForwardIos as ArrowForwardIosIcon,
  FirstPage as FirstPageIcon,
  LastPage as LastPageIcon,
} from "@mui/icons-material";

const Pagination = ({
  total,
  sizePerPage,
  currentPage,
  path,
}: {
  total: number;
  sizePerPage: number;
  currentPage: number;
  path: string;
}) => {
  const totalPage = Math.ceil(total / sizePerPage);
  return (
    <div className="flex items-center justify-between px-4 sm:px-6">
      <div className="flex sm:flex-1 sm:items-center sm:justify-center">
        <div>
          <nav
            className="relative z-0 inline-flex -space-x-px rounded-md"
            aria-label="Pagination"
          >
            <Link
              href={`${path}/1`}
              className="relative inline-flex items-center px-3 py-2 text-sm font-normal text-gray-600 hover:bg-gray-50"
            >
              <span className="sr-only">First</span>
              <FirstPageIcon className="w-5 h-5" />
            </Link>
            <Link
              href={`${path}/${Math.max(1, currentPage - 1)}`}
              className="relative inline-flex items-center px-3 py-2 text-sm font-normal text-gray-600 hover:bg-gray-50"
            >
              <ArrowBackIosNewIcon className="w-3 h-3" />
            </Link>
            {[...Array(PaginationConst.allBox)].map((_, i) => {
              let page;
              const a = i + 1;
              const b = currentPage + a - 2;
              const c = totalPage - (PaginationConst.allBox - a);
              if (totalPage <= PaginationConst.allBox) {
                if (totalPage < a) {
                  return;
                }
                page = a;
              } else {
                if (a <= PaginationConst.breakPoint - 1) {
                  page = Math.max(a, Math.min(b, c));
                } else if (a == PaginationConst.breakPoint) {
                  page = b < c ? "..." : c;
                } else if (PaginationConst.breakPoint + 1 <= a) {
                  page = c;
                }
              }
              return (
                <Link
                  key={i}
                  href={`${path}/${page}`}
                  className={
                    currentPage == page
                      ? "relative z-10 inline-flex items-center bg-greenBgColor px-4 py-2 text-sm font-normal text-gray-600"
                      : "relative inline-flex items-center px-4 py-2 text-sm font-normal text-gray-600 hover:bg-gray-50"
                  }
                >
                  {page}
                </Link>
              );
            })}
            <Link
              href={`${path}/${Math.min(totalPage, currentPage + 1)}`}
              className="relative inline-flex items-center px-3 py-2 text-sm font-normal text-gray-600 hover:bg-gray-50"
            >
              <ArrowForwardIosIcon className="w-3 h-3" />
            </Link>
            <Link
              href={`${path}/${totalPage}`}
              className="relative inline-flex items-center px-3 py-2 text-sm font-normal text-gray-600 hover:bg-gray-50"
            >
              <span className="sr-only">Last</span>
              <LastPageIcon className="w-5 h-5" />
            </Link>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
