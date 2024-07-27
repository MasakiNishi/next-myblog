// component
const name = "Masaki Nishi";

const ProfileText = ({ className = "" }: { className?: string }) => {
  return <p className={`${className}`}>{name}</p>;
};

export default ProfileText;
