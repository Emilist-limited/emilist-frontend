import { ChangeEvent } from "react";
import Image from "next/image";

import FormSelect from "@/components/molecules/FormSelect";
import FormDate from "@/components/molecules/FormDate";

import { PlannedJobType } from "../../types";
import { formatDate } from "@/lib/helpers/dates";

interface PlannedJobFrequencyForm {
  plannedJob: PlannedJobType;
  handleChangePlannedJob: (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  removeReminder: (index: number) => void;
  addReminder: () => void;
  handleReminderDatesChange: (index: number, value: number) => void;
  reminderDates: number[];
}

const PlannedJobFrequencyForm = ({
  plannedJob,
  handleChangePlannedJob,
  removeReminder,
  addReminder,
  handleReminderDatesChange,
  reminderDates,
}: PlannedJobFrequencyForm) => {
  const today = new Date();

  const frequencyOptions = [
    { value: "Weekly", label: "Weekly" },
    { value: "Monthly", label: "Monthly" },
    { value: "Quarterly", label: "Quarterly" },
    { value: "Yearly", label: "Yearly" },
  ];

  return (
    <>
      <div className="col-span-1 flex flex-col gap-4 max-md:col-span-2 mr-4 max-md:mr-0">
        <FormSelect
          label="Maintenance frequency"
          name="frequency"
          id="frequency"
          value={plannedJob.frequency}
          options={frequencyOptions}
          onChange={handleChangePlannedJob}
        />
        <FormDate
          label="Start Date"
          id="startDate"
          name="startDate"
          value={plannedJob.startDate}
          onChange={handleChangePlannedJob}
          min={formatDate(today)}
        />
        <FormDate
          label="End Date"
          id="endDate"
          name="endDate"
          value={plannedJob.endDate}
          onChange={handleChangePlannedJob}
        />
      </div>
      <div className="col-span-1 flex flex-col gap-4 max-md:col-span-2 mr-4 max-md:mr-0">
        <div className="w-full space-y-2">
          <p className="text-[#5e625f]  font-medium max-sm:text-sm">Reminder</p>
          {reminderDates.map((reminder, index) => (
            <div key={index} className="flex items-center space-x-2">
              <div className="min-w-full w-full max-w-full rounded-lg h-10 px-2 bg-[#ececec] focus:outline-none focus-within:border-primary-green focus-within:border-1">
                <select
                  style={{ fontSize: "16px" }}
                  className="bg-[#ececec] outline-none min-w-full w-full h-full max-w-full max-sm:text-sm"
                  name="reminder"
                  value={reminder}
                  onChange={(e) =>
                    handleReminderDatesChange(index, Number(e.target.value))
                  }
                >
                  {Array.from({ length: 30 }, (_, i) => i + 1).map((num) => (
                    <option
                      key={num}
                      value={num}
                      disabled={reminderDates.includes(num)}
                    >
                      {num}
                    </option>
                  ))}
                </select>
              </div>
              {index > 0 && (
                <button
                  onClick={() => removeReminder(index)}
                  className="px-2 py-1 bg-red-500 text-white rounded"
                >
                  -
                </button>
              )}
            </div>
          ))}
          {reminderDates?.length < 3 && (
            <button
              onClick={addReminder}
              className=" flex items-center text-primary-green py-2 text-base font-[500] max-sm:text-sm cursor-pointer max-w-fit"
            >
              <Image
                src="/icons/add.svg"
                alt="logo"
                width={130}
                height={30}
                className="object-contain w-[24px] h-[24px] max-sm:w-[16px] max-sm:h-[16px] mr-1"
              />
              Add More
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default PlannedJobFrequencyForm;
