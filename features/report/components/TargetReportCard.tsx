interface TargetReportCard {
  barStyle: string;
  current: number | string;
  target: number | string;
  percentage: number;
  title: string;
  description: string;
}

const TargetReportCard = ({
  barStyle,
  current,
  target,
  percentage,
  title,
  description,
}: TargetReportCard) => {
  return (
    <div className="max-w-sm w-full min-w-[254px] bg-white p-4 flex flex-col justify-between gap-3 rounded-lg shadow-md h-44 min-h-28">
      <div className="space-y-2">
        <h6 className="text-lg font-medium max-sm:text-sm">{title}</h6>
        <p className="max-sm:text-sm">{description}</p>
      </div>
      <div className="flex flex-col items-end gap-1">
        <p className="sm:text-sm text-[#737774] font-semibold text-xs">
          {current}/{target}
        </p>
        <progress
          className={`progress w-full ${barStyle}`}
          value={percentage}
          max="100"
        ></progress>
      </div>
    </div>
  );
};

export default TargetReportCard;
