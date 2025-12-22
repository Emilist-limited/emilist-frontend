import { ChangeEvent, useState } from "react";
import { formatInputTextNumber } from "../helpers/formatNumbers";

export const usePromoteState = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [endDate, setEndDate] = useState("");
  const [isLoad, setIsLoad] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [target, setTarget] = useState("");
  const [expectedClicks, setExpectedClicks] = useState("");

  const handleClickChange = (e: ChangeEvent<HTMLInputElement>) => {
    const clickValue = e.target.value;
    setExpectedClicks(formatInputTextNumber(clickValue));
  };

  return {
    isOpen,
    setIsOpen,
    endDate,
    setEndDate,
    isLoad,
    setIsLoad,
    startDate,
    setStartDate,
    target,
    setTarget,
    expectedClicks,
    handleClickChange,
    setExpectedClicks,
  };
};
