// component
import Image from "next/image";

const HeaderIconLink = ({
  href,
  iconSrc,
  title,
}: {
  href: string;
  iconSrc: string;
  title: string;
}) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      title={title}
      className="p-2"
    >
      <Image src={iconSrc} alt={title} width={30} height={30} />
    </a>
  );
};

export default HeaderIconLink;
