"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { generateYears } from "@/lib/helpers/generateYears";
import { optionsType } from "@/types";

interface SelectComponentsProps {
  month: string;
  year: string;
  handleMonthChange: (value: string) => void;
  handleYearChange: (value: string) => void;
  options: optionsType[];
  placeholder?: string;
}

const MonthYearSelectComponent: React.FC<SelectComponentsProps> = ({
  month,
  year,
  handleMonthChange,
  handleYearChange,
  options,
  placeholder = "Filter by month",
}) => {
  const years = generateYears(2024);

  return (
    <div className="flex-c-b mt-6 gap-4 flex-wrap">
      <Select value={month} onValueChange={handleMonthChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent className="bg-white">
          <SelectGroup>
            <SelectLabel>Month</SelectLabel>
            {options.map((monthObj) => (
              <SelectItem
                key={monthObj.value}
                value={monthObj.value.toString()}
              >
                {monthObj.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>

      <Select value={year} onValueChange={handleYearChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Filter by year" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Year</SelectLabel>
            {years.map((yearObj) => (
              <SelectItem key={yearObj.value} value={yearObj.value}>
                {yearObj.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default MonthYearSelectComponent;
