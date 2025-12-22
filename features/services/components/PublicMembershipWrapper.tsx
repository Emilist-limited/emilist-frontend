import MembershipCard from "@/components/molecules/cards/MembershipCard";
import NoMoreMessage from "@/components/atoms/NoMoreMessage";

import { convertDateFormat } from "@/lib/helpers";
import { Membership } from "../types";

const PublicMembershipWrapper = ({
  memberships,
}: {
  memberships: Membership[];
}) => {
  return (
    <div className="pt-10 pb-6">
      <h3 className="text-xl font-semibold mb-6">Membership</h3>
      <div className="flex flex-wrap gap-8">
        <MembershipCard
          organization="Painters Association of Nigeria"
          position="Member"
          startDate="25/Feb/1998"
          endDate="25/Feb/1998"
        />
        {memberships?.length > 0 ? (
          <>
            {memberships?.map((membership: Membership, index: number) => (
              <MembershipCard
                key={index}
                organization={membership?.organisation || "N/A"}
                position={membership?.positionHeld || "N/A"}
                startDate={
                  membership?.startDate
                    ? convertDateFormat(membership?.startDate)
                    : "N/A"
                }
                endDate={
                  membership?.isMembershipExpire
                    ? "Doesn't end"
                    : membership?.endDate
                    ? convertDateFormat(membership?.endDate)
                    : "N/A"
                }
              />
            ))}
          </>
        ) : (
          <NoMoreMessage message="No membership provided" />
        )}
      </div>
    </div>
  );
};

export default PublicMembershipWrapper;
