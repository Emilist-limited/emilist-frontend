interface InsuranceInfoProps {
  title: string;
  value: string | number;
  isMembership?: boolean;
}

const InsuranceValue = ({ title, value, isMembership }: InsuranceInfoProps) => {
  return (
    <div
      className={`space-y-1 w-full ${isMembership && "flex flex-wrap gap-4"}`}
    >
      <h6
        className={`font-semibold sm:text-sm text-xs ${isMembership && "w-28"}`}
      >
        {title}
      </h6>
      <p className="sm:text-sm text-xs">{value}</p>
    </div>
  );
};

export default InsuranceValue;
