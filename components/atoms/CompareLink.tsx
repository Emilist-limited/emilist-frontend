import Link from "next/link";

const CompareLink = ({
  href,
  children,
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) => (
  <Link
    href={href}
    className={`text-sm border border-[#303632] py-3 rounded-[10px] w-36 text-center ${className}`}
  >
    {children}
  </Link>
);

export default CompareLink;
