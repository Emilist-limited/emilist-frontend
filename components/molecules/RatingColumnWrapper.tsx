import Image from "next/image";

import ProfileImage from "../atoms/ProfileImage";
import Rating from "./Rating";

import { formatCreatedAt } from "@/lib/helpers/formatCreatedAt";

interface RatingColumnWrapperProps {
  profileImage?: string;
  name: string;
  rating: number;
  comment: string;
  date: Date;
  helpful?: () => Promise<void>;
  notHelpful?: () => Promise<void>;
  wasHelpful?: boolean;
}

const RatingColumnWrapper = ({
  profileImage,
  name,
  rating,
  comment,
  date,
  helpful,
  notHelpful,
  wasHelpful = false,
}: RatingColumnWrapperProps) => {
  return (
    <div className="p-4 bg-white flex gap-4 w-full">
      {profileImage ? (
        <ProfileImage
          src={profileImage}
          alt="profile pic"
          className="sm:w-20 w-16 sm:h-20 h-16 object-cover  rounded-full"
        />
      ) : (
        <p className="sm:w-20 w-16 sm:h-20 h-16 rounded-full bg-slate-200 flex-c justify-center font-bold">
          {name[0]?.toUpperCase()}
        </p>
      )}
      <div className="flex flex-col gap-6">
        <div className="flex-c gap-4 flex-wrap">
          <h3 className="sm:text-lg font-semibold">{name}</h3>
          <Rating rating={rating} />
        </div>
        <p className="text-gray-500 mt-2 max-sm:text-sm">
          {comment && comment}
        </p>
        <p className="text-gray-400 max-sm:text-sm">
          Published {date && formatCreatedAt(date)}
        </p>
        {wasHelpful && (
          <div className="flex-c gap-12">
            <button className="sm:text-lg font-medium flex-c" onClick={helpful}>
              <Image
                src="/icons/like.svg"
                width={8}
                height={8}
                alt="like"
                className="object-contain sm:w-8 sm:h-8 w-6 h-6 pr-2"
              />
              Helpful
            </button>
            <button
              className="sm:text-lg font-medium flex-c"
              onClick={notHelpful}
            >
              <Image
                src="/icons/dislike.svg"
                width={8}
                height={8}
                alt="dislike"
                className="object-contain sm:w-8 sm:h-8 w-6 h-6 pr-2"
              />
              Not Helpful
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default RatingColumnWrapper;
