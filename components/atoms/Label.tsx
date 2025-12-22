interface LabelProps {
  htmlFor: string;
  children: React.ReactNode;
  className?: string;
}

const Label = ({ htmlFor, children, className = "" }: LabelProps) => (
  <label
    htmlFor={htmlFor}
    className={`font-medium max-sm:text-sm text-left py-2 ${className}`}
  >
    {children}
  </label>
);

export default Label;
