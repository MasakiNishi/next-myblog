// component
import Image from "next/image";

const avatarSrc = "/images/sns/avatar.jpg";
const avatarAlt = "Avatar";

const Avatar = ({ className = "" }: { className?: string }) => {
  return (
    <div
      className={`w-16 h-16 rounded-full overflow-hidden border border-customGray ${className}`}
    >
      <Image src={avatarSrc} alt={avatarAlt} width={58} height={58} />
    </div>
  );
};

export default Avatar;
