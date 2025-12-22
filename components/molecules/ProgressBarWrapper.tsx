import ProgressBar from "../atoms/ProgressBar";

interface ProgressBarWrapperProps {
  title: string;
  percentage: number | string;
  barStyle: string;
}

const ProgressBarWrapper = ({
  title,
  percentage,
  barStyle,
}: ProgressBarWrapperProps) => {
  return (
    <div className="text-sm font-medium max-sm:text-xs">
      <h6 className="">{title}</h6>
      <ProgressBar percentage={percentage} barStyle={barStyle} />
    </div>
  );
};

export default ProgressBarWrapper;
