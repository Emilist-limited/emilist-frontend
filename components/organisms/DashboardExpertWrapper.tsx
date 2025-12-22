"use client";

import { useContext } from "react";

import { CompareContext } from "@/lib/context/CompareState";
import { ROUTES } from "@/lib/constants/routes";
import { JobSkeleton } from "../molecules/skeletonLoaders/JobSkeleton";
import { useCompare } from "@/features/services/hooks/useCompare";
import { useLikeBusiness } from "@/features/services/hooks/useLikeBusiness";
import { useUnlikeBusiness } from "@/features/services/hooks/useUnLikeBusiness";
import { useGetBusinesses } from "@/features/services/hooks/useGetBusinesses";

import CompareSearch from "../molecules/CompareSearch";
import DashboardToggleSearchNavWrapper from "./DashboardToggleSearchNavWrapper";
import NoMoreMessage from "../atoms/NoMoreMessage";
import CustomPagination from "../molecules/CustomPagination";
import WhiteBgLoader from "../atoms/WhiteBgLoader";
import ServiceViewCard from "../molecules/cards/ServiceViewCard";

const DashboardExpertWrapper = () => {
  const { compareServices } = useContext(CompareContext);

  const { compare, isComparing } = useCompare();
  const { handleLikeBusiness, isLoading } = useLikeBusiness();
  const { handleUnlikeBusiness, isLoad } = useUnlikeBusiness();
  const {
    businesses,
    search,
    totalPages,
    currentPage,
    handleChange,
    handlePageChange,
    isFetching,
    setIsFetching,
    reFetchAllBusinesses,
    totalBusinesses,
  } = useGetBusinesses();

  const handleLike = (id: string) => {
    handleLikeBusiness(id, () => {
      reFetchAllBusinesses();
    });
  };

  const handleUnlike = (id: string) => {
    handleUnlikeBusiness(id, () => {
      reFetchAllBusinesses();
    });
  };

  const handleCompare = (id: string) => {
    compare(id, () => {
      reFetchAllBusinesses();
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsFetching(true);
    await reFetchAllBusinesses();
  };

  const loading = isComparing || isLoad || isLoading;

  return (
    <div className="col-span-7 max-lg:col-span-10 w-full">
      {loading && <WhiteBgLoader />}
      <DashboardToggleSearchNavWrapper
        link={ROUTES?.JOIN_EXPERT}
        linkTitle="Join as an expert"
        description="Search for experts/buisnesses, view all available business listings, save business for quick access later, and compare businesses you're interested in."
        search={search}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
      <div className="flex flex-col overflow-y-auto gap-4 hide-scrollbar max-w-full overflow-x-hidden pb-6 bg-white rounded-b-lg px-1">
        {compareServices?.length > 0 && (
          <CompareSearch title="businesses" link={ROUTES?.COMPARE_BUSINESSES} />
        )}
        {isFetching ? (
          <JobSkeleton className="w-full h-56 min-h-56" />
        ) : (
          <>
            {businesses?.length < 1 ? (
              <div className="p-6">
                {search ? (
                  <NoMoreMessage message="No result found, try searching for something else" />
                ) : (
                  <NoMoreMessage message="No business or expert listed" />
                )}
              </div>
            ) : (
              <>
                {businesses?.map((expert: any) => (
                  <ServiceViewCard
                    key={expert._id}
                    expert={expert}
                    compare={handleCompare}
                    handleLike={handleLike}
                    handleUnlike={handleUnlike}
                    isShadow={false}
                  />
                ))}
                {totalBusinesses > 10 && (
                  <div className="md:w-2/3 w-full pt-2">
                    <CustomPagination
                      handlePageChange={handlePageChange}
                      currentPage={currentPage}
                      totalPages={totalPages}
                    />
                  </div>
                )}
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default DashboardExpertWrapper;
