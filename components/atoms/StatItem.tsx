interface StatItemProps {
  label: string;
  value: string | number;
  className?: string;
}

const StatItem = ({ label, value, className = "" }: StatItemProps) => (
  <div className={`flex items-center gap-4 ${className}`}>
    <h4 className="text-[#303632] w-32 font-medium max-sm:text-sm">{label}:</h4>
    <p className="font-bold max-sm:text-sm">{value}</p>
  </div>
);

export default StatItem;
