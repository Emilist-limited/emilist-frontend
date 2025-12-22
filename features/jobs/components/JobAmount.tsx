import { formatCreatedAt } from "@/lib/helpers/formatCreatedAt";

interface JobAmountProps {
  createdAt: Date;
  duration: string | number;
  period: string;
}

const JobAmount = ({ createdAt, duration, period }: JobAmountProps) => {
  return (
    <div className="flex-c-b text-[#737774]">
      <h6 className="text-sm font-msdium max-sm:text-xs">
        Posted: {createdAt && formatCreatedAt(createdAt)}
      </h6>
      <h6 className="text-sm font-medium max-sm:text-xs">
        Duration: {duration} {period}
      </h6>
    </div>
  );
};

export default JobAmount;
