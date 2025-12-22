"use client";

import { useContext } from "react";

import { AuthContext } from "@/lib/context/AuthState";
import { ROUTES } from "@/lib/constants/routes";
import { useAddClicks } from "@/lib/hooks/useAddClicks";
import { useGetBusinesses } from "@/features/services/hooks/useGetBusinesses";
import { useHorizontalScroll } from "@/lib/hooks/useHorizontalScroll";

import ExpertCard from "../molecules/cards/ExpertCard";
import PopularSection from "../molecules/skeletonLoaders/PopularSection";
import NoMoreMessage from "../atoms/NoMoreMessage";
import MorePopularLinkButton from "../atoms/MorePopularLinkButton";

const PopularExpertData = () => {
  const { currentUser } = useContext(AuthContext);
  const userId = currentUser?._id;

  const { addClicks } = useAddClicks();

  const { data, loading, hasMore, setCurrentPage } = useGetBusinesses();
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
      {data?.map((expert, index) => (
        <div className="flex flex-col gap-4" key={index}>
          <ExpertCard
            expert={expert}
            onClick={() => addClicks("business", expert?._id, userId || null)}
          />
          <MorePopularLinkButton href={ROUTES?.HIRE_EXPERT}>
            See experts near you
          </MorePopularLinkButton>
        </div>
      ))}
      {loading && <PopularSection />}
      {!!hasMore && data?.length > 10 && (
        <NoMoreMessage message="No more experts" />
      )}
    </div>
  );
};

export default PopularExpertData;
