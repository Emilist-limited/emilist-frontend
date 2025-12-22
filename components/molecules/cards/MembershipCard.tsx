import LabelValue from "@/components/atoms/LabelValue";

interface MembershipCardProps {
  organization: string;
  position: string;
  startDate: string;
  endDate: string;
}

const MembershipCard = ({
  organization,
  position,
  startDate,
  endDate,
}: MembershipCardProps) => (
  <div className="shadow-md px-4 py-6 max-w-md rounded-lg bg-white">
    <h4 className="text-center text-lg font-semibold mb-4">{organization}</h4>
    <div className="space-y-3">
      <LabelValue label="Position Held" value={position} />
      <LabelValue label="Starting Date" value={startDate} />
      <LabelValue label="End Date" value={endDate} />
    </div>
  </div>
);

export default MembershipCard;
