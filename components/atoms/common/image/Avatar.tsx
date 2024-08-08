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
    <div className={`relative ${className}`}>
      <Image
        src={imageSrc}
        alt="プロフィール画像"
        loading="lazy"
        decoding="async"
        fill
        sizes="100%"
        className="object-cover"
      />
    </div>
  );
};

export default Avatar;
