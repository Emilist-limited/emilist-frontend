import Link from "next/link";

import { ROUTES } from "@/lib/constants/routes";
import { useGetMaterialReviews } from "../hooks/useGetMaterialReviews";

import Rating from "@/components/molecules/Rating";
import RatingProfileCard from "@/components/molecules/RatingProfileCard";

interface UserMaterialReviewsProps {
  rating: number;
  materialId: string;
}

const UserMaterialReviews = ({
  rating,
  materialId,
}: UserMaterialReviewsProps) => {
  const { data, isLoadin } = useGetMaterialReviews(materialId, "mostRecent");

  return (
    <div className="sm:col-span-3 col-span-12 bg-white sm:p-6 p-4 h-fit space-y-10">
      <div className="space-y-2">
        <h6 className="sm:text-lg font-medium">Rating</h6>
        <div className="flex-c gap-1">
          <Rating rating={rating} />
          <span className="block text-sm text-gray-400">{rating}</span>
        </div>
      </div>
      <div className="space-y-2">
        <div className="flex-c-b gap-4">
          <h6 className="sm:text-lg font-medium">Reviews</h6>
          {data?.length > 0 && (
            <Link
              href={ROUTES?.ALL_REVIEWS_FOR_MATERIAL(materialId)}
              className="text-primary-green sm:text-sm text-xs hover:text-green-600 duration-300 transition-all"
            >
              See all reviews
            </Link>
          )}
        </div>

        <div className="flex flex-col gap-4 max-w-[676px]">
          {isLoadin ? (
            <div className="w-full h-20 bg-gray-200 animate-pulse rounded-lg" />
          ) : (
            <>
              {data?.length < 1 ? (
                <p className="text-gray-500">No reviews yet.</p>
              ) : (
                data?.map((review: any, index: number) => (
                  <RatingProfileCard
                    key={index}
                    name={review?.userId?.fullName || review?.userId?.userName}
                    rating={review.rating}
                    description={review.comment}
                    profileImage={{
                      src: review.userId?.profileImage,
                      alt: "User profile picture",
                    }}
                  />
                ))
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserMaterialReviews;
