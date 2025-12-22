import CheckIcon from "../atoms/CheckIcon";

const MilestoneState = ({
  imgUrl,
  onClick,
}: {
  imgUrl: string;
  onClick?: () => void;
}) => {
  return (
    <div className="flex items-center gap-2">
      <p className="font-medium max-sm:text-sm">Milestone completed</p>
      <button type="button" onClick={onClick}>
        <CheckIcon imgUrl={imgUrl} alt="check_icon" />
      </button>
    </div>
  );
};

export default MilestoneState;
