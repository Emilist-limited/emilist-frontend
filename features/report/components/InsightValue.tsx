"use client";

import Image from "next/image";

interface InsightValueProps {
  imgUrl: string;
  title: string;
  value: string | number;
}

const InsightValue = ({ imgUrl, title, value }: InsightValueProps) => {
  return (
    <div className="col-span-2 flex gap-2 items-start">
      <Image
        src={imgUrl}
        alt="logo"
        width={20}
        height={20}
        className="object-contain w-6 h-6 mt-1"
      />
      <div className="flex flex-col gap-3">
        <h6 className="font-semibold text-lg max-sm:text-sm">{title}</h6>
        <p className="text-[#474C48] max-sm:text-xs ">{value}</p>
      </div>
    </div>
  );
};

export default InsightValue;
