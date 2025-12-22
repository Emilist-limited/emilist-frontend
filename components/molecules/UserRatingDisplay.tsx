import Rating from "./Rating";

interface UserRatingDisplayProps {
  rating?: number;
  totalReviews?: number;
}

const UserRatingDisplay = ({
  rating,
  totalReviews,
}: UserRatingDisplayProps) => {
  return (
    <div className="flex items-center my-1 gap-2 max-sm:gap-0 pl-2">
      <Rating rating={rating || 0} />
      <p className="text-sm max-sm:text-xs"> ({totalReviews})</p>
    </div>
  );
};

export default UserRatingDisplay;
