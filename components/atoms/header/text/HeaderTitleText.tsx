// component
const HeaderTextTitle = ({
  title,
  subTitle,
  titleClassName,
  subTitleClassName,
}: {
  title: string;
  subTitle: string;
  titleClassName?: string;
  subTitleClassName?: string;
}) => {
  return (
    <div className="lg:text-center text-left">
      <p className={titleClassName}>
        {title}
        <br />
        <small className={subTitleClassName}>{subTitle}</small>
      </p>
    </div>
  );
};

export default HeaderTextTitle;
