import CustomButton from "./CustomButton";

interface EmptyStateProps {
  icon?: React.ReactElement;
  title: string;
  description: string;
  link?: string;
  btnTitle?: string;
}

const EmptyState = ({
  icon,
  title,
  description,
  link,
  btnTitle,
}: EmptyStateProps) => {
  const showBtn = link !== undefined && btnTitle !== undefined;
  return (
    <div className="h-[60vh] w-full flex flex-col justify-center items-center gap-2">
      {icon && <div className="flex justify-center">{icon}</div>}
      <h2 className="sm:text-3xl text-xl font-semibold text-center">{title}</h2>
      <p className="max-sm:text-sm">{description}</p>
      <div className="flex justify-center">
        {showBtn && <CustomButton href={link}>{btnTitle}</CustomButton>}
      </div>
    </div>
  );
};

export default EmptyState;
