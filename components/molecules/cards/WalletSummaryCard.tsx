interface WalletSummaryCardProps {
  title: string;
  value: number | string;
}

const WalletSummaryCard = ({ title, value }: WalletSummaryCardProps) => {
  return (
    <div className=" bg-white dark:bg-secondary-dark-bg dark:border-2 shadow px-4 py-8 rounded-lg flex-1 min-w-[200px]">
      <h4 className="text-gray-400 sm:text-xl">{title}</h4>
      <h1 className="sm:text-2xl text-lg font-bold pt-5 whitespace-nowrap">
        {value}
      </h1>
    </div>
  );
};

export default WalletSummaryCard;
