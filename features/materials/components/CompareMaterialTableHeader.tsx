import CompareText from "@/components/atoms/CompareText";
import React from "react";

const CompareMaterialTableHeader = () => {
  return (
    <div className="absolute left-0 sm:w-52 w-28 bg-white flex flex-col font-semibold max-sm:text-sm">
      <div className="w-full h-[330px] border-b py-6" />
      <CompareText className="py-6">Product name</CompareText>
      <CompareText className="py-6 h-[200px]">Description</CompareText>
      <CompareText className="py-6">Ratings</CompareText>
      <CompareText className="py-6">Reviews</CompareText>
      <CompareText className="py-6">Brand</CompareText>
      <CompareText className="py-6">Category</CompareText>
      <CompareText className="py-6">Sub category</CompareText>
      <CompareText className="py-6">Available quantity</CompareText>
      <CompareText className="py-6">Location</CompareText>
      <CompareText className="py-6">Store name</CompareText>
    </div>
  );
};

export default CompareMaterialTableHeader;
