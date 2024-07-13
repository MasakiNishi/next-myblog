// component
import HeaderIconLink from "../../atoms/header/image/HeaderIconLink";

interface SocialLink {
  href: string;
  iconSrc: string;
  title: string;
}

const HeaderSocialIcons = ({ socialLinks }: { socialLinks: SocialLink[] }) => {
  return (
    <div className="flex justify-center space-x-4">
      {socialLinks.map((link) => (
        <HeaderIconLink
          key={link.title}
          href={link.href}
          iconSrc={link.iconSrc}
          title={link.title}
        />
      ))}
    </div>
  );
};

export default HeaderSocialIcons;
