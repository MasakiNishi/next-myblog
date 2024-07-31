// component
import Image from "next/image";

const PostFeatureImage = ({
  src,
  alt,
  className = "",
}: {
  src: string;
  alt: string;
  className?: string;
}) => {
  return (
    <a
      href={src}
      target="_blank"
      rel="noopener noreferrer"
      className={`block relative w-full max-w-[800px] h-96 -mx-14 overflow-hidden ${className}`}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes=""
        priority={true}
        className="object-cover"
      />
    </a>
  );
};

export default PostFeatureImage;
