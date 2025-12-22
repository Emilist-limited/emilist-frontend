"use client";

import { useState } from "react";

import { filterOptions } from "@/lib/constants/filterOptions";
import { useGetMaterialReview } from "../hooks/useGetMaterialReview";

import PageLoader from "@/components/atoms/PageLoader";
import BusinessReviewHeading from "@/features/services/components/BusinessReviewHeading";
import ReviewBreakdown from "./ReviewBreakdown";
import FilterWrapper from "@/components/molecules/FilterWrapper";
import RatingColumnWrapper from "@/components/molecules/RatingColumnWrapper";
import LoadMoreButton from "@/components/atoms/LoadMoreButton";

const MaterialReviewWrapper = ({ materialId }: { materialId: string }) => {
  const [filter, setFilter] = useState("mostRelevant");
  const {
    data,
    reviews,
    isLoadin,
    getReviews,
    totalPages,
    currentPage,
    setCurrentPage,
  } = useGetMaterialReview(materialId, filter);

  const handleChange = (value: string) => {
    setFilter(value);
  };

  const loadMoreReviews = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
      getReviews();
    }
  };

  return (
    <div className="pt-10 padding-ctn">
      {isLoadin ? (
        <PageLoader />
      ) : (
        <div>
          <BusinessReviewHeading
            reviewCount={reviews?.numberOfRatings || 0}
            averageRating={reviews?.averageRating || 0}
          />
          <ReviewBreakdown starCount={reviews?.starCounts} />
          <FilterWrapper
            filter={filter}
            handleChange={handleChange}
            options={filterOptions}
          />
          <div className="flex flex-col pt-10 gap-10 max-w-[820px] w-full">
            {data?.map((review: any) => (
              <RatingColumnWrapper
                key={review?._id}
                name={review?.userId?.fullName || review?.userId?.userName}
                profileImage={review?.userId?.profileImage}
                rating={review?.rating || 0}
                comment={review?.comment}
                date={review?.createdAt}
              />
            ))}
            <div className="flex justify-center">
              {totalPages > 1 && (
                <LoadMoreButton onClick={() => loadMoreReviews()} />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MaterialReviewWrapper;
