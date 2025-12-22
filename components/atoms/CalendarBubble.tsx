interface CalendarBubbleProps {
  date: Date;
  currentDate?: boolean;
}

const CalendarBubble = ({ date, currentDate }: CalendarBubbleProps) => {
  return (
    <div className="rounded-3xl">
      <div className="shadow w-7 max-w-7 min-w-7 rounded-3xl">
        <div
          className={`p-2 m-1 flex-c-b flex-col gap-1 h-14 ${
            currentDate && "bg-primary-green rounded-3xl"
          }`}
        >
          <h6
            className={`capitalize text-sm  ${
              currentDate ? "text-white" : "text-[#B8B9B8]"
            }`}
          >
            {date.toLocaleDateString("en-US", { weekday: "short" }).charAt(0)}
          </h6>
          <p
            className={`capitalize text-xs font-semibold  ${
              currentDate ? "text-white" : "text-[#737774]"
            }`}
          >
            {date.toLocaleDateString("en-US", { day: "numeric" })}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CalendarBubble;
