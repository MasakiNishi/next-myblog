// component
const HeaderTextTitle = ({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) => {
  return (
    <div className="text-center">
      <p className="mt-4 text-2xl font-light text-gray-600 leading-5">
        {title}
      </p>
      <small className="text-xs text-gray-500">{subtitle}</small>
    </div>
  );
};

export default HeaderTextTitle;
