import Image from "next/image";
import { Dispatch, SetStateAction } from "react";

interface CircleSelectProps {
  option: string;
  onClick: () => void;
  match: string;
  title: string;
}

const CircleSelect = ({ option, onClick, match, title }: CircleSelectProps) => {
  return (
    <div className="flex items-center gap-2" onClick={onClick}>
      <Image
        src={option === match ? "/icons/circle-color.svg" : "/icons/circle.svg"}
        alt="menu"
        width={25}
        height={25}
        className="object-contain w-6 h-6"
      />{" "}
      <p>{title}</p>
    </div>
  );
};

export default CircleSelect;
