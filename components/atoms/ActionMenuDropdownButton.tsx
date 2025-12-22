import Link from "next/link";

interface Props {
  onClick?: () => void;
  title: string;
  href?: string;
  className?: string;
}

const ActionMenuDropdownButton = ({
  className = "whitespace-nowrap block max-sm:text-sm hover:text-primary-green transition-all duration-300",
  onClick,
  href,
  title,
}: Props) => {
  return (
    <>
      {onClick ? (
        <button className={className} onClick={onClick}>
          {title}
        </button>
      ) : href ? (
        <Link href={href} className={className}>
          {title}
        </Link>
      ) : null}
    </>
  );
};

export default ActionMenuDropdownButton;
