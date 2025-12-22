"use client";

import { useState } from "react";

import { filterOptions } from "@/lib/constants/filterOptions";
import { useGetBusinessReviews } from "../hooks/useGetBusinessReviews";
import { useMarkBusinessReviewHelpful } from "../hooks/useMarkBusinessReviewHelpful";

import PageLoader from "@/components/atoms/PageLoader";
import BusinessReviewHeading from "./BusinessReviewHeading";
import BusinessReviewBreakdown from "./BusinessReviewBreakdown";
import FilterWrapper from "@/components/molecules/FilterWrapper";
import RatingColumnWrapper from "@/components/molecules/RatingColumnWrapper";
import LoadMoreButton from "@/components/atoms/LoadMoreButton";

const BusinessReviewWrapper = ({ businessId }: { businessId: string }) => {
  const [filter, setFilter] = useState("mostRelevant");

  const { markReviewBusinessHelpful } = useMarkBusinessReviewHelpful();
  const {
    data,
    reviews,
    isLoading,
    getReviews,
    totalPages,
    setCurrentPage,
    currentPage,
  } = useGetBusinessReviews(businessId, filter);

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
      {isLoading ? (
        <PageLoader />
      ) : (
        <div>
          <BusinessReviewHeading
            reviewCount={reviews?.numberOfRatings || 0}
            averageRating={reviews?.averageRating || 0}
          />
          <BusinessReviewBreakdown
            starCount={reviews?.starCounts}
            communicationRating={reviews?.averageCommunicationRating}
            serviceAsSeen={reviews?.serviceAsSeen}
          />
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
                helpful={() => markReviewBusinessHelpful(review?._id, true)}
                notHelpful={() => markReviewBusinessHelpful(review?._id, false)}
                wasHelpful
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

export default BusinessReviewWrapper;
