import dynamic from "next/dynamic";

import HomeSectionHeader from "../molecules/HomeSectionHeader";

import { ROUTES } from "@/lib/constants/routes";

const PopularJobData = dynamic(() => import("../organisms/PopularJobData"));

const PopularJobs = () => {
  return (
    <section className="padding-y no-scroll">
      <div className="padding-l-ctn w-full">
        <HomeSectionHeader
          title="Find jobs around you"
          href={ROUTES?.FIND_JOB}
        />
        <PopularJobData />
      </div>
    </section>
  );
};

export default PopularJobs;
