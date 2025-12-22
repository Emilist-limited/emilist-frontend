"use client";

import { useContext } from "react";

import { AuthContext } from "@/lib/context/AuthState";
import { ROUTES } from "@/lib/constants/routes";
import { useAddClicks } from "@/lib/hooks/useAddClicks";
import { useHorizontalScroll } from "@/lib/hooks/useHorizontalScroll";
import { useGetMaterials } from "@/features/materials/hooks/useGetMaterials";

import PopularSection from "../molecules/skeletonLoaders/PopularSection";
import NoMoreMessage from "../atoms/NoMoreMessage";
import MorePopularLinkButton from "../atoms/MorePopularLinkButton";
import MaterialCard from "../molecules/cards/MaterialCard";

const PopularMaterialData = () => {
  const { currentUser } = useContext(AuthContext);
  const userId = currentUser?._id;

  const { addClicks } = useAddClicks();
  const { data, loading, hasMore, setCurrentPage } = useGetMaterials();
  const { containerRef, handleScroll } = useHorizontalScroll(
    () => setCurrentPage((prev) => prev + 1),
    hasMore
  );

  return (
    <div
      ref={containerRef}
      onScroll={handleScroll}
      className="flex w-full overflow-x-scroll gap-4 sm:mt-6 py-4 hide-scrollbar"
    >
      {data?.map((material, index) => (
        <div className="flex flex-col gap-4" key={index}>
          <MaterialCard
            material={material}
            onClick={() => addClicks("materials", material._id, userId || null)}
          />
          <MorePopularLinkButton href={ROUTES?.BUY_MATERIALS}>
            See more materials
          </MorePopularLinkButton>
        </div>
      ))}
      {loading && <PopularSection />}
      {!!hasMore && data?.length > 10 && (
        <NoMoreMessage message="No more materials" />
      )}
    </div>
  );
};

export default PopularMaterialData;
