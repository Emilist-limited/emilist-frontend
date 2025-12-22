import InsuranceValue from "./InsuranceValue";
import NoMoreMessage from "@/components/atoms/NoMoreMessage";

import { convertDateFormat } from "@/lib/helpers";
import { Membership } from "../types";

const MembershipInfo = ({ memberships }: { memberships: Membership[] }) => {
  return (
    <div className="space-y-4">
      <h5 className="font-semibold max-sm:text-sm">Membership</h5>
      <div className="flex flex-col gap-6">
        {memberships?.length > 0 ? (
          <>
            {memberships?.map((membership: Membership, index: number) => (
              <div className="space-y-4" key={index}>
                <InsuranceValue
                  title="Organization:"
                  value={membership?.organisation || "N/A"}
                  isMembership
                />
                <InsuranceValue
                  title="Position held:"
                  value={membership?.positionHeld || "N/A"}
                  isMembership
                />
                <InsuranceValue
                  title="Starting Date:"
                  value={
                    membership?.startDate
                      ? convertDateFormat(membership?.startDate)
                      : "N/A"
                  }
                  isMembership
                />
                <InsuranceValue
                  title="End Date:"
                  value={
                    membership?.isMembershipExpire
                      ? "Doesn't end"
                      : membership?.endDate
                      ? convertDateFormat(membership?.endDate)
                      : "N/A"
                  }
                  isMembership
                />
              </div>
            ))}
          </>
        ) : (
          <NoMoreMessage message="No membership provided" />
        )}
      </div>
    </div>
  );
};

export default MembershipInfo;
