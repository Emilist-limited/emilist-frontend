import EarningsCard from "./EarningsCard";

const EarningsCardWrapper = ({ earnings, timeFrame }: any) => {
  const totalsByCurrency = earnings?.totalsByCurrency || {};
  const currentCurrency = Object.keys(totalsByCurrency)[0] || "";

  const earned = totalsByCurrency[currentCurrency]?.earned ?? 0;
  const expenses = totalsByCurrency[currentCurrency]?.expenses ?? 0;

  return (
    <div className="flex flex-wrap gap-6 mt-5">
      <EarningsCard
        title="Amount Spent"
        className="text-[#FF5D7A]"
        currentCurrency={currentCurrency}
        value={expenses}
        timeFrame={timeFrame}
      />
      <EarningsCard
        title="Amount Earned"
        className="text-primary-green"
        currentCurrency={currentCurrency}
        value={earned}
        timeFrame={timeFrame}
      />
    </div>
  );
};

export default EarningsCardWrapper;
