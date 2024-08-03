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
    <div className={`${className}`}>
      <Image
        src={imageSrc}
        alt="プロフィール画像"
        fill
        sizes="width: 100%"
        className="object-cover"
        priority={true}
      />
    </div>
  );
};

export default Avatar;
