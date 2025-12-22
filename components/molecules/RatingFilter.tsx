import Image from "next/image";

import Rating from "./Rating";
import FilterHeading from "../atoms/FilterHeading";

import { serviceRating } from "@/lib/constants";

interface fetchDataPros {
  rating: string;
  setRating: (rating: string) => void;
  fetchData: () => Promise<void>;
}

const RatingFilter = ({ rating, setRating, fetchData }: fetchDataPros) => {
  return (
    <div className="w-full border-b-1 py-6">
      <FilterHeading title="Rating" />
      <div className="flex flex-col gap-4 my-3">
        {serviceRating.map((ratingg) => (
          <div
            className="flex items-center gap-4 cursor-pointer"
            key={ratingg.count}
            onClick={() => {
              setRating(ratingg.value);
            }}
          >
            <Image
              src={
                rating === ratingg.value
                  ? "/icons/circle-color.svg"
                  : "/icons/circle.svg"
              }
              alt="menu"
              width={25}
              height={25}
              className="object-contain w-6 h-6"
            />
            <Rating rating={ratingg.count} />
            <span>& Above</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RatingFilter;
