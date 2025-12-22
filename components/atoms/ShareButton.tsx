import Image from "next/image";
import Tooltip from "./Tooltip";

interface ShareButtonProps {
  show?: boolean;
  type: string;
  handleOpen: () => void;
}

const ShareButton = ({ show = true, type, handleOpen }: ShareButtonProps) => {
  return (
    <button className="flex-c gap-2 cursor-pointer group" onClick={handleOpen}>
      <Tooltip content={`Share ${type}`} position="bottom">
        <span className="text-lg block">
          <Image
            src="/icons/share.svg"
            height={20}
            width={20}
            alt="share-icon"
            className="sm:w-6 sm:h-6 w-5 h-5 object-contain"
          />
        </span>
      </Tooltip>
      {show && <span className="sm:text-sm text-xs">Share</span>}
    </button>
  );
};

export default ShareButton;
