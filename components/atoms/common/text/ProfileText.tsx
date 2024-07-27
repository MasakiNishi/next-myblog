// component
const description =
  "サンフランシスコ・シリコンバレーでのインターンや外資Sler、メガベンチャーでのエンジニアを経験後、現在はAmazon Web Servicesに勤務。";

const ProfileText = ({ className = "" }: { className?: string }) => {
  return <p className={`${className}`}>{description}</p>;
};

export default ProfileText;
