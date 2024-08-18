// const
import ProfileConst from "../../../../constants/ProfileConst";
// type
import FeaturedImageType from "@/types/FeaturedImageType";

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
      <img
        src={
          featuredImage.thumbnail
            ? featuredImage.thumbnail
            : ProfileConst.profileImage
        }
        alt={featuredImage.alt ? featuredImage.alt : "thumbnail"}
        width={featuredImage.width}
        height={featuredImage.height}
        loading="lazy"
        decoding="async"
        className="w-full h-full object-cover"
      />
    </picture>
  );
};

export default PostListImage;
