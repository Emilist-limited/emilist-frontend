import dynamic from "next/dynamic";

import HomeSectionHeader from "../molecules/HomeSectionHeader";

import { ROUTES } from "@/lib/constants/routes";

const PopularMaterialData = dynamic(
  () => import("../organisms/PopularMaterialData")
);

const PopularMaterials = ({ bgColor }: { bgColor: string }) => {
  return (
    <section className={`${bgColor} padding-y no-scroll`}>
      <div className=" padding-l-ctn">
        <HomeSectionHeader
          title="Materials you may need"
          href={ROUTES?.BUY_MATERIALS}
        />
        <PopularMaterialData />
      </div>
    </section>
  );
};

export default PopularMaterials;
