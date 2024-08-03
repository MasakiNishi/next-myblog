// constant
import PageConst from "../../../constants/PageConst";
// component
import Link from "next/link";

const HeaderMenu = () => {
  return (
    <nav className="flex flex-col items-center space-y-2">
      {PageConst.pageList?.map((page) => (
        <Link
          key={page}
          href={page === "top" ? "/" : `/${page}`}
          className="text-base font-light text-gray-800"
        >
          {page}
        </Link>
      ))}
    </nav>
  );
};

export default HeaderMenu;
