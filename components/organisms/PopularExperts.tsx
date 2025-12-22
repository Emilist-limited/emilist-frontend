import dynamic from "next/dynamic";

import HomeSectionHeader from "../molecules/HomeSectionHeader";

import { ROUTES } from "@/lib/constants/routes";

const PopularExpertData = dynamic(
  () => import("../organisms/PopularExpertData")
);

const PopularExperts = () => {
  return (
    <section className="padding-y no-scroll">
      <div className="padding-l-ctn">
        <HomeSectionHeader
          title="Services around you"
          href={ROUTES?.HIRE_EXPERT}
        />
        <PopularExpertData />
      </div>
    </section>
  );
};

export default PopularExperts;
