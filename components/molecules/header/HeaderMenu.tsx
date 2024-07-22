// component
import HeaderMenuLink from "../../atoms/header/text/HeaderMenuLink";

const HeaderMenu = () => {
  return (
    <nav className="flex flex-col items-center space-y-2">
      <HeaderMenuLink href="/">top</HeaderMenuLink>
      <HeaderMenuLink href="/blog">blog</HeaderMenuLink>
      <HeaderMenuLink href="/about">about</HeaderMenuLink>
      <HeaderMenuLink href="/contact">contact</HeaderMenuLink>
    </nav>
  );
};

export default HeaderMenu;
