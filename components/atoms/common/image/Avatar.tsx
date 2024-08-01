// component
import Image from "next/image";

const Avatar = ({
  imageSrc,
  className = "",
}: {
  imageSrc: string;
  className?: string;
}) => {
  return (
    <div
      className={`w-16 h-16 rounded-full overflow-hidden border border-customGray relative ${className}`}
    >
      <Image
        src={imageSrc}
        alt="プロフィール画像"
        fill
        className="object-cover"
        priority={true}
      />
    </div>
  );
};

export default Avatar;
