interface ProgressBarProps {
  percentage: number | string;
  barStyle: string;
}

const ProgressBar = ({ percentage, barStyle }: ProgressBarProps) => {
  return (
    <div className="flex-c w-full gap-4">
      <div className="flex-1">
        <progress
          className={`progress ${barStyle}`}
          value={percentage}
          max="100"
        ></progress>
      </div>
      <p>{percentage}%</p>
    </div>
  );
};

export default ProgressBar;
