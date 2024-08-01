const ProfileText = ({
  description,
  className = "",
}: {
  description: string;
  className?: string;
}) => {
  return <p className={`${className}`}>{description}</p>;
};

export default ProfileText;
