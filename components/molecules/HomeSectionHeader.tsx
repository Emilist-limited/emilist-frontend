import HomeSectionTitle from "../atoms/HomeSectionTitle";
import SeeMoreLink from "../atoms/SeeMoreLink";

interface HomeSectionHeaderProps {
  title: string;
  href: string;
}

const HomeSectionHeader: React.FC<HomeSectionHeaderProps> = ({
  title,
  href,
}) => (
  <div className="flex-c-b pr-6">
    <HomeSectionTitle title={title} />
    <SeeMoreLink href={href} />
  </div>
);
export default HomeSectionHeader;
