import CustomButton from "@/components/atoms/CustomButton";

interface DirectJobActionButtonsProps {
  onAccept: () => void;
  onReject: () => void;
}

const DirectJobActionButtons = ({
  onAccept,
  onReject,
}: DirectJobActionButtonsProps) => {
  return (
    <div className="flex items-center flex-wrap gap-2">
      <CustomButton onClick={onAccept}>Accept job</CustomButton>
      <button className="red-btn" onClick={onReject}>
        Reject job
      </button>
    </div>
  );
};

export default DirectJobActionButtons;
