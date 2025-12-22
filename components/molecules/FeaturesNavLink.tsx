interface FeaturesNavLinkProps {
  link: string;
  name: string;
  isActive: boolean;
}

const FeaturesNavLink = ({ link, name, isActive }: FeaturesNavLinkProps) => (
  <li>
    <a
      href={link}
      className={`font-semibold hover:text-primary-green transition-all duration-300 max-sm:text-sm whitespace-nowrap ${
        isActive
          ? "text-primary-green border-b-primary-green border-b-1"
          : "text-gray-400"
      }`}
    >
      {name}
    </a>
  </li>
);

export default FeaturesNavLink;
