const CustomCompareButton = ({
  children,
  onClick,
  className = "",
}: {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}) => (
  <button
    className={`px-3 border border-gray-700 font-semibold rounded-[10px] h-9 max-sm:h-7 max-sm:text-xs ${className}`}
    onClick={onClick}
  >
    {children}
  </button>
);

export default CustomCompareButton;
