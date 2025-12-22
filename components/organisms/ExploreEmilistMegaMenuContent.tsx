import { useRouter } from "next/navigation";

import { category, serviceList } from "@/lib/constants";
import { createSearchHandler } from "@/lib/helpers/searchHandler";
import { ROUTES } from "@/lib/constants/routes";

import MenuSection from "./MenuSection";
import AppPromotion from "./AppPromotion";

const ExploreEmilistMegaMenuContent = () => {
  const router = useRouter();
  const handleSearch = createSearchHandler(router);

  const handleItemClick = (item: string, type: "service" | "job") => {
    const path = type === "service" ? ROUTES.SEARCH_SERVICE : ROUTES.FIND_JOB;
    handleSearch(path, { q: item });
  };

  return (
    <div className="flex padding-ctn py-6 gap-10">
      <div className="flex-1">
        <MenuSection
          title="Industry"
          items={category}
          type="job"
          onItemClick={(item) => handleItemClick(item, "job")}
        />
        <MenuSection
          title="Services"
          items={serviceList}
          type="service"
          onItemClick={(item) => handleItemClick(item, "service")}
        />
        <MenuSection
          title="Private Expert"
          items={["Private expert"]}
          type="link"
          href="/expert/private-expert"
        />
      </div>
      <AppPromotion />
    </div>
  );
};

export default ExploreEmilistMegaMenuContent;
