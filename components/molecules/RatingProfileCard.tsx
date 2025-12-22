"use client";

import { motion, AnimatePresence } from "framer-motion";

import { ProfileCardProps } from "@/types";

import ProfileImage from "../atoms/ProfileImage";
import Rating from "./Rating";

const RatingProfileCard: React.FC<ProfileCardProps> = ({
  name,
  rating,
  description,
  profileImage,
}) => (
  <AnimatePresence mode="wait">
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.5 }}
      className="flex items-center w-full px-10 py-5 shadow-md rounded-xl max-sm:px-3 max-sm:py-3"
    >
      <div className="mr-4">
        {profileImage ? (
          <ProfileImage
            src={profileImage.src}
            alt={profileImage.alt}
            size={60}
            className="sm:h-14 sm:w-14 h-12 w-12"
          />
        ) : (
          <p className="sm:w-12 w-10 sm:h-12 h-10 rounded-full bg-slate-200 flex-c justify-center font-bold">
            {name?.charAt(0).toUpperCase()}
          </p>
        )}
      </div>
      <div className="flex-1">
        <h6 className="sm:text-lg font-bold">{name && name}</h6>
        <Rating rating={rating} />
        <p className=" max-sm:text-sm">{description}</p>
      </div>
    </motion.div>
  </AnimatePresence>
);
export default RatingProfileCard;
