const CompareText = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => <p className={`text-sm ${className}`}>{children}</p>;

export default CompareText;
