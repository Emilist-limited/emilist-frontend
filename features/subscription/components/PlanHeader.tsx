interface PlanHeaderProps {
  planType: "monthly" | "yearly";
  setPlanType: (planType: "monthly" | "yearly") => void;
}

const PlanHeader = ({ planType, setPlanType }: PlanHeaderProps) => {
  return (
    <div className="w-full flex flex-col items-center gap-3 justify-center">
      <h2 className="sm:text-3xl font-bold  max-sm:text-xl max-sm:text-center">
        Subscription Plans
      </h2>
      <h2 className="max-sm:text-xs text-center">
        Start building for free, then add a site plan to go live. Account plans
        unlock additional features.
      </h2>
      <div className="flex items-center bg-[#F3F4F6] border-1 border-[#F3F4F6] w-full max-w-sm h-12 rounded-md p-0.5">
        <button
          className={`${
            planType === "monthly" && "bg-white"
          } flex-1 w-full h-full text-[#374151]  text-sm font-[500] leading-[24px] max-sm:text-[12px]`}
          onClick={() => setPlanType("monthly")}
        >
          Monthly
        </button>
        <button
          className={`${
            planType === "yearly" && "bg-white"
          } flex-1 w-full h-full text-[#374151]  text-sm font-[500] leading-[24px] max-sm:text-[12px]`}
          onClick={() => setPlanType("yearly")}
        >
          Yearly
        </button>
      </div>
    </div>
  );
};

export default PlanHeader;
