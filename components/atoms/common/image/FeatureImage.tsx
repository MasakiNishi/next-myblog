// const
import SeoConst from "../../../../constants/SeoConst";
// type
import FeaturedImageType from "@/types/FeaturedImageType";
// component
import Image from "next/image";

const FeatureImage = ({
  featuredImage,
  className = "",
}: {
  featuredImage: FeaturedImageType;
  className?: string;
}) => {
  return (
    <a
      href={featuredImage.full}
      target="_blank"
      rel="noopener noreferrer"
      className={`${className}`}
    >
      <picture className="block relative w-full max-w-[800px] h-96 -mx-14 overflow-hidden">
        <source
          media="(max-width: 480px)"
          type="image/webp"
          srcSet={`${featuredImage.medium}.webp, ${featuredImage.doubleMedium}.webp 2x`}
        />
        <source
          media="(max-width: 480px)"
          type="image/jpeg"
          srcSet={`${featuredImage.medium}, ${featuredImage.doubleMedium} 2x`}
        />
        <source
          media="(min-width: 481px)"
          type="image/webp"
          srcSet={`${featuredImage.large}.webp, ${featuredImage.doubleLarge}.webp 2x`}
        />
        <source
          media="(min-width: 481px)"
          type="image/jpeg"
          srcSet={`${featuredImage.large}, ${featuredImage.doubleLarge} 2x`}
        />
        <Image
          src={featuredImage.large ? featuredImage.large : SeoConst.defaultOgp}
          alt={featuredImage.alt ? featuredImage.alt : "Featured Image"}
          loading="lazy"
          decoding="async"
          fill
          sizes="100%"
          className="object-cover"
        />
      </picture>
    </a>
  );
};

export default FeatureImage;
