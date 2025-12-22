import { landingPageLinks } from "@/lib/constants";
import { useActivePath } from "@/lib/hooks/useActivePath";

import FeaturesNavLink from "../molecules/FeaturesNavLink";

const FeatureLinksWrapper = () => {
  return (
    <section className="w-full">
      <ul className="flex items-center w-full sm:gap-6 gap-3 my-5 overflow-x-auto hide-scrollbar">
        {landingPageLinks.map((link) => (
          <FeaturesNavLink
            key={link.id}
            link={link.link}
            name={link.name}
            isActive={useActivePath(link.link)}
          />
        ))}
      </ul>
    </section>
  );
};

export default FeatureLinksWrapper;
