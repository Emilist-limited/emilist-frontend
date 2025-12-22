"use client";

import Image from "next/image";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { optionsType } from "@/types";

interface FilterWrapperProps {
  filter: string;
  handleChange: (filter: string) => void;
  options: optionsType[];
}

const FilterWrapper = ({
  filter,
  handleChange,
  options,
}: FilterWrapperProps) => {
  return (
    <div className="flex-c gap-4 text-gray-600 border-b-1 py-6">
      <div className="flex-c gap-2">
        <Image
          height={6}
          width={6}
          alt="filter"
          src="/icons/filter.svg"
          className="w-6 h-6 object-contain"
        />
        <p className="">Filter</p>
      </div>
      <Select value={filter} onValueChange={handleChange}>
        <SelectTrigger className="w-[180px] border-gray-400 border-1 shadow">
          <SelectValue placeholder="Filter by" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {options?.map((data: optionsType) => (
              <SelectItem key={data?.label} value={data?.value.toString()}>
                {data?.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default FilterWrapper;
