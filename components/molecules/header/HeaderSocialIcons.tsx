// constant
import ProfileConst from "../../../constants/ProfileConst";
// component
import XIcon from "@mui/icons-material/X";
import YouTubeIcon from "@mui/icons-material/YouTube";
import InstagramIcon from "@mui/icons-material/Instagram";

const HeaderSocialIcons = () => {
  const x = ProfileConst.socialLinks[0];
  const youtube = ProfileConst.socialLinks[1];
  const instagram = ProfileConst.socialLinks[2];
  return (
    <div className="flex justify-center space-x-4">
      <a
        href={x.href}
        target="_blank"
        rel="noopener noreferrer"
        title={x.title}
        className="p-2 text-xColor hover:text-xColor"
      >
        <XIcon />
      </a>
      <a
        href={youtube.href}
        target="_blank"
        rel="noopener noreferrer"
        title={youtube.title}
        className="p-2 pr-4 text-youtubeColor hover:text-youtubeColor"
      >
        <YouTubeIcon className="text-3xl" />
      </a>
      <a
        href={instagram.href}
        target="_blank"
        rel="noopener noreferrer"
        title={instagram.title}
        className="w-[25px] h-[25px] mt-[8px] flex items-center justify-center rounded-md bg-gradient-to-r from-instagramGradientStart via-instagramGradientMiddle1 via-instagramGradientMiddle2 via-instagramGradientMiddle3 to-instagramGradientEnd text-white hover:text-white"
      >
        <InstagramIcon className="text-[23px]" />
      </a>
    </div>
  );
};

export default HeaderSocialIcons;
