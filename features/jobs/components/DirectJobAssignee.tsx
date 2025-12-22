import { levelCount } from "@/lib/constants";
import { LevelType } from "@/types";
import { useContext } from "react";
import { AuthContext } from "@/lib/context/AuthState";
import { useMemoizedUser } from "@/features/auth/helpers";

import ApplicantProfile from "./ApplicantProfile";
import SideChatWrapper from "@/features/messages/component/SideChatWrapper";

interface DirectJobAssigneeProps {
  applicant: any;
  isJobOwner: boolean;
  currency: string;
  type: string;
}

const DirectJobAssignee = ({
  applicant,
  isJobOwner,
  type,
  currency,
}: DirectJobAssigneeProps) => {
  const { currentUser } = useContext(AuthContext);

  const chatUser = useMemoizedUser(applicant?.user);

  const { level, rating } = levelCount[applicant?.user?.level as LevelType] || {
    level: "Level 5",
    rating: 5,
  };
  return (
    <div className="bg-white w-full rounded-lg py-6">
      <h5 className="sm:text-lg font-semibold mb-5 px-5">Artisan</h5>

      <div className="px-5 max-lg:px-3 py-6 hover:bg-gray-50 transition-all duration-300 group space-y-2">
        <ApplicantProfile
          status={applicant?.status}
          userId={applicant?.user?._id}
          businessId={applicant?.businessId}
          isNotAcceptedApplicant={false}
          profileImage={applicant?.user?.profileImage}
          name={applicant?.user?.fullName || applicant?.user?.userName || "N/A"}
          level={level}
          rating={rating}
          currency={currency}
          maximumPrice={applicant?.biddableDetails?.maximumPrice}
          type={type}
          applicantOrJobOwner={
            currentUser?._id === applicant?.user?._id || isJobOwner
          }
        />
        {isJobOwner && <SideChatWrapper chatUser={chatUser} />}
      </div>
    </div>
  );
};

export default DirectJobAssignee;
