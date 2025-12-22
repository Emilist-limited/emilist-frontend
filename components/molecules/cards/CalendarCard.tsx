import CalendarBubble from "@/components/atoms/CalendarBubble";

const CalendarCard = () => {
  const currentDate = new Date();

  const getLastNDays = (date: Date, n: number) => {
    const dates = [];
    for (let i = 1; i <= n; i++) {
      const previousDate = new Date(date);
      previousDate.setDate(date.getDate() - i);
      dates.push(previousDate);
    }
    return dates.reverse();
  };

  const getNextNDays = (date: Date, n: number) => {
    const dates = [];
    for (let i = 1; i <= n; i++) {
      const nextDate = new Date(date);
      nextDate.setDate(date.getDate() + i);
      dates.push(nextDate);
    }
    return dates;
  };

  const last3Days = getLastNDays(currentDate, 2);
  const next3Days = getNextNDays(currentDate, 4);

  return (
    <div className="bg-white w-full p-6 max-sm:px-3 flex flex-col gap-6 rounded-lg">
      <h4 className="capitalize sm:text-lg font-semibold">
        {currentDate.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        })}{" "}
      </h4>
      <div className="flex w-full gap-3 overflow-x-scroll hide-scrollbar">
        {last3Days.map((date, index) => (
          <CalendarBubble date={date} key={index} />
        ))}
        <CalendarBubble date={currentDate} currentDate />

        {next3Days.map((date, index) => (
          <CalendarBubble date={date} key={index} />
        ))}
      </div>
    </div>
  );
};

export default CalendarCard;
