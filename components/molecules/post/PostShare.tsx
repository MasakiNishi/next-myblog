"use client";

// constant
import SeoConst from "../../../constants/SeoConst";
// component
import {
  TwitterShareButton,
  FacebookShareButton,
  LineShareButton,
  HatenaShareButton,
  PocketShareButton,
  TwitterIcon,
  FacebookIcon,
  LineIcon,
  HatenaIcon,
  PocketIcon,
} from "react-share";

const PostShare = ({ slug, title }: { slug: string; title: string }) => {
  const twitterId = SeoConst.twitterId.slice(1);
  return (
    <div className="text-center my-8">
      <p className="text-lg sm:text-xl lg:text-xl text-gray-600 my-8">
        シェアする
      </p>
      <div className="flex justify-center space-x-4">
        <TwitterShareButton
          url={slug}
          title={title}
          via={twitterId}
          related={[`${twitterId}`]}
        >
          <TwitterIcon size={35} round={true} />
        </TwitterShareButton>
        <FacebookShareButton url={slug} title={title}>
          <FacebookIcon size={35} round={true} />
        </FacebookShareButton>
        <LineShareButton url={slug} title={title}>
          <LineIcon size={35} round={true} />
        </LineShareButton>
        <HatenaShareButton url={slug} title={title}>
          <HatenaIcon size={35} round={true} />
        </HatenaShareButton>
        <PocketShareButton url={slug} title={title}>
          <PocketIcon size={35} round={true} />
        </PocketShareButton>
      </div>
    </div>
  );
};

export default PostShare;
