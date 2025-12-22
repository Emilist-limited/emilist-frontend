import ProfileAvatar from "@/components/atoms/ProfileAvatar";

import { numberWithCommas } from "@/lib/helpers";
import { AnalyticsType } from "../types";

interface AboutJobOwnerProps {
  jobInfo: any;
  analytics: AnalyticsType;
}

const AboutJobOwner = ({ jobInfo, analytics }: AboutJobOwnerProps) => {
  return (
    <div className="bg-white w-full rounded-lg py-6 px-5">
      <h5 className="sm:text-lg font-semibold  mb-5">About the job posted</h5>
      <div className=" flex flex-col  gap-5 ">
        <div className="flex-c gap-3">
          <ProfileAvatar
            className="w-[37px] h-[37px] max-sm:w-[18px] max-sm:h-[18px]"
            profileImage={jobInfo?.userId?.profileImage}
            name={jobInfo?.userId?.fullName || jobInfo?.userId?.userName}
          />
          <h6 className="text-lg font-medium max-sm:text-sm">
            {jobInfo?.userId?.fullName || jobInfo?.userId?.userName}
          </h6>
        </div>
        <div className="flex-c gap-3 w-full">
          <h6 className="flex-1 text-sm font-semibold whitespace-nowrap">
            Total Job posted:
          </h6>
          <p className="flex-1 text-[#303632] text-sm">
            {analytics?.totalJobsPosted
              ? numberWithCommas(analytics?.totalJobsPosted)
              : 0}
          </p>
        </div>
        <div className="flex-c gap-3 w-full">
          <h6 className="flex-1 text-sm font-semibold whitespace-nowrap">
            Total Expert Hired:
          </h6>
          <p className="flex-1 text-[#303632] text-sm">
            {analytics?.totalArtisansHired
              ? numberWithCommas(analytics?.totalArtisansHired)
              : 0}
          </p>
        </div>
        {/* <div className="flex-c gap-3 w-full">
              {" "}
              <h6 className="flex-1 text-sm font-semibold whitespace-nowrap">
                Total Amount spent:
              </h6>
              <p className="flex-1 text-[#303632] text-sm">
                ₦{" "}
                {jobInfo?.userDetails?.totalAmountSpent
                  ? jobInfo?.userDetails?.totalAmountSpent
                  : 0}
              </p>
            </div> */}
      </div>
    </div>
  );
};

export default AboutJobOwner;
