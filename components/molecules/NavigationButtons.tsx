import CustomButton from "../atoms/CustomButton";

interface NavigationButtonsProps {
  onPrev?: () => void;
  onNext?: () => void;
  nextHref?: string;
  prevHref?: string;
  onSubmit?: boolean;
  isSubmitting?: boolean;
  isAllInputFilled?: boolean;
  handleSubmit?: () => Promise<void>;
}

const NavigationButtons = ({
  onNext,
  onPrev,
  prevHref,
  nextHref,
  isSubmitting,
  onSubmit,
  handleSubmit,
  isAllInputFilled,
}: NavigationButtonsProps) => {
  return (
    <div className="flex gap-2 justify-end max-sm:justify-center">
      {onPrev && (
        <CustomButton href={prevHref} onClick={onPrev}>
          Back
        </CustomButton>
      )}
      {onNext && (
        <CustomButton href={nextHref} onClick={onNext}>
          Next
        </CustomButton>
      )}
      {onSubmit && (
        <CustomButton
          loading={isSubmitting}
          onClick={handleSubmit}
          isAllInputFilled={isAllInputFilled}
        >
          Submit
        </CustomButton>
      )}
    </div>
  );
};

export default NavigationButtons;
