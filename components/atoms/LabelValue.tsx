interface LabelValueProps {
  label: string;
  value: string;
  className?: string;
}

const LabelValue = ({ label, value, className = "" }: LabelValueProps) => (
  <div className={`flex items-center gap-4 ${className}`}>
    <h4 className="font-semibold w-32 max-sm:text-sm">{label}:</h4>
    <p className="text-[#303632] max-sm:text-sm">{value}</p>
  </div>
);
export default LabelValue;
