// component
import Image from "next/image";

const PostListImage = ({
  src,
  alt,
  className = "",
}: {
  src: string;
  alt: string;
  className?: string;
}) => {
  return (
    <div
      className={`relative inline-block overflow-hidden border border-customGray rounded-[75%_65%] m-0 ${className}`}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        style={{ objectFit: "cover" }}
        priority={true}
      />
    </div>
  );
};

export default PostListImage;
