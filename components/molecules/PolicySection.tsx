interface PolicySectionProps {
  title: string;
  level?: number;
  children: React.ReactNode;
  className?: string;
}
const PolicySection = ({
  title,
  level = 2,
  children,
  className,
}: PolicySectionProps) => {
  return (
    <section className={`my-6 ${className}`}>
      <h2 className={level === 2 ? "text-2xl" : "text-lg"}>{title}</h2>
      {children}
    </section>
  );
};

export default PolicySection;
