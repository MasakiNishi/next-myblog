// component
import Image from "next/image";

const HeaderAvatar = ({ src, alt }: { src: string; alt: string }) => {
  return (
    <div className="w-16 h-16 rounded-full overflow-hidden border border-customGray">
      <Image src={src} alt={alt} width={58} height={58} />
    </div>
  );
};

export default HeaderAvatar;
