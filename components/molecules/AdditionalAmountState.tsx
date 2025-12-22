import CheckIcon from "../atoms/CheckIcon";

const AdditionalAmountState = ({
  onClick,
  title,
  imgUrl,
  alt,
}: {
  onClick: () => void;
  title: string;
  imgUrl: string;
  alt: string;
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="font-medium max-sm:text-sm flex-c gap-2"
    >
      <CheckIcon alt={alt} imgUrl={imgUrl} />
      <span>{title}</span>
    </button>
  );
};

export default AdditionalAmountState;
