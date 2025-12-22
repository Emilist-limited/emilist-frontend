import Link from "next/link";

interface LinkButtonProps {
  href: string;
  children: React.ReactNode;
}

const MorePopularLinkButton: React.FC<LinkButtonProps> = ({
  href,
  children,
}) => {
  return (
    <Link
      href={href}
      className="border border-gray-700 rounded-lg px-4 py-2 font-medium max-md:text-sm w-fit hover:border-gray-500 hover:text-gray-500 transition-all duration-300"
    >
      {children}
    </Link>
  );
};

export default MorePopularLinkButton;
