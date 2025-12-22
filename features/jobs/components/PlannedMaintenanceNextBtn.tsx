import React from "react";

const PlannedMaintenanceNextBtn = ({
  nextPage,
  setNextPage,
}: {
  nextPage: number;
  setNextPage: (value: number) => void;
}) => {
  return (
    <div className="flex-c gap-4 mt-4 overflow-x-auto hide-scrollbar">
      <div
        className="flex-c gap-2 text-sm cursor-pointer"
        onClick={() => setNextPage(1)}
      >
        <span
          className={`h-5 w-5 block flex-c justify-center rounded-full text-xs ${
            nextPage === 1 ? "bg-primary-green text-white" : "bg-gray-400"
          }`}
        >
          1
        </span>{" "}
        <span className="whitespace-nowrap">Job Details</span>
      </div>
      <span>
        {" "}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m8.25 4.5 7.5 7.5-7.5 7.5"
          />
        </svg>
      </span>
      <div
        className="flex-c gap-2 text-sm cursor-pointer"
        onClick={() => setNextPage(2)}
      >
        <span
          className={`h-5 w-5 block flex-c justify-center rounded-full text-xs ${
            nextPage === 2 ? "bg-primary-green text-white" : "bg-gray-400"
          }`}
        >
          2
        </span>{" "}
        <span className="whitespace-nowrap">Reccuring Schedule</span>
      </div>
    </div>
  );
};

export default PlannedMaintenanceNextBtn;
