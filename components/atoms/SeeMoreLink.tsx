import Link from "next/link";

const SeeMoreLink = ({ href }: { href: string }) => (
  <Link
    href={href}
    className="text-primary-green hover:underline transition-all duration-300"
  >
    See more
  </Link>
);

export default SeeMoreLink;
