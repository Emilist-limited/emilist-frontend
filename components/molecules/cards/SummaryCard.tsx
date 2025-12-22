import Link from "next/link";
import Image from "next/image";

interface SummaryCardProps {
  cardLink: string;
  cardIcon: string;
  cardTitle: string;
  cardSum: string | number | undefined | null;
}

const SummaryCard = ({
  cardIcon,
  cardLink,
  cardSum,
  cardTitle,
}: SummaryCardProps) => {
  return (
    <Link href={cardLink}>
      <div className="sm:w-[340px] sm:max-w-[340px] sm:min-w-[340px] max-w-sm w-full max-sm:min-w-[280px]    border-1 border-[#B8B9B8] rounded-lg p-4  bg-white">
        <Image
          src={cardIcon && cardIcon}
          alt="menu"
          width={28}
          height={28}
          className="object-contain w-8 h-8 max-sm:w-6 max-sm:h-6"
        />
        <div className="flex-c-b w-full mt-3">
          <div className="flex flex-col">
            <h5 className="font-semibold max-sm:text-sm">{cardTitle}</h5>
            <p className="text-[#737774] text-xs">Total</p>
          </div>
          <div className="flex items-center gap-2">
            <h2 className="text-3xl font-semibold max-sm:text-xl">{cardSum}</h2>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default SummaryCard;
