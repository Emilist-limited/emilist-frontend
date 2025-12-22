import CalendarCard from "../molecules/cards/CalendarCard";
import MessageCard from "../molecules/cards/MessageCard";
import TargetCard from "../molecules/cards/TargetCard";

const DashboardCardWrapper = () => {
  return (
    <div className="flex flex-col gap-4 w-full max-lg:overflow-x-scroll max-lg:flex-row hide-scrollbar">
      <CalendarCard />
      <TargetCard />
      <MessageCard />
    </div>
  );
};

export default DashboardCardWrapper;
