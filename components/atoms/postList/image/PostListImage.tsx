// const
import ProfileConst from "../../../../constants/ProfileConst";
// type
import FeaturedImageType from "@/types/FeaturedImageType";
// component
import Image from "next/image";

const PostListImage = ({
  featuredImage,
  className = "",
}: {
  featuredImage: FeaturedImageType;
  className?: string;
}) => {
  return (
    <picture
      className={`relative inline-block overflow-hidden border border-customGray rounded-[75%_65%] m-0 ${className}`}
    >
      <source
        type="image/webp"
        srcSet={`${featuredImage.thumbnail}.webp, ${featuredImage.doubleThumbnail}.webp 2x`}
      />
      <source
        type="image/jpeg"
        srcSet={`${featuredImage.thumbnail}, ${featuredImage.doubleThumbnail} 2x`}
      />
      <Image
        src={
          featuredImage.thumbnail
            ? featuredImage.thumbnail
            : ProfileConst.profileImage
        }
        alt={featuredImage.alt ? featuredImage.alt : "thumbnail"}
        loading="lazy"
        decoding="async"
        fill
        sizes="100%"
        className="object-cover"
      />
    </picture>
  );
};

export default PostListImage;
