const ProfileText = ({
  name,
  className = "",
}: {
  name: string;
  className?: string;
}) => {
  return <p className={`${className}`}>{name}</p>;
};

export default ProfileText;
