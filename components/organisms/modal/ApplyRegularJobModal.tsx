"use client";

import Link from "next/link";
import Image from "next/image";
import { memo, useContext, useState } from "react";

import { AuthContext } from "@/lib/context/AuthState";
import { ROUTES } from "@/lib/constants/routes";
import { useToast } from "@/lib/hooks/useToast";

import CustomModal from "@/components/atoms/CustomModal";
import CustomButton from "@/components/atoms/CustomButton";
import Label from "@/components/atoms/Label";

interface ApplyRegularJobModalProps {
  isOpen: boolean;
  jobId: string;
  onCancel: () => void;
  isApplying: boolean;
  onApplyJob: (
    e: React.FormEvent<HTMLFormElement>,
    jobId: string,
    businessId: string
  ) => void;
}

const ApplyRegularJobModal = memo(
  ({
    isOpen,
    onCancel,
    isApplying,
    onApplyJob,
    jobId,
  }: ApplyRegularJobModalProps) => {
    const { showToast } = useToast();
    const { currentUser } = useContext(AuthContext);
    const [service, setService] = useState("");

    const applyJob = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (currentUser?.businesses.length === 0) {
        showToast({
          message: "Please add a business to proceed",
          type: "error",
        });
        return;
      }
      if (!service) {
        showToast({
          message: "Please select a business",
          type: "error",
        });
        return;
      }
      onApplyJob(e, jobId, service);
    };

    return (
      <CustomModal isOpen={isOpen} onClose={onCancel}>
        <form className="w-full px-6 max-sm:px-1 py-3" onSubmit={applyJob}>
          <h2 className="text-lg font-bold pb-5">Job Application</h2>
          <div className="flex flex-col gap-4">
            <div className="w-full space-y-1">
              <Label htmlFor="service">
                Select business you want to apply with
              </Label>
              <div className="expert-reg-input-div">
                <select
                  className="min-w-full w-full max-w-full rounded-lg h-10 px-2 bg-[#ececec] focus:outline-none focus-within:border-primary-green focus-within:border-1"
                  id="service"
                  name="service"
                  value={service}
                  style={{ fontSize: "16px" }}
                  onChange={(e) => setService(e.target.value)}
                >
                  {currentUser?.businesses?.length > 0 ? (
                    <option defaultValue="">Select business</option>
                  ) : (
                    <option defaultValue="">No business registered</option>
                  )}
                  {currentUser?.businesses?.map(
                    (business: any, index: number) => (
                      <option key={index} value={business?._id}>
                        {business?.businessName}
                      </option>
                    )
                  )}
                </select>
              </div>
              <Link href={ROUTES?.JOIN_EXPERT} className="flex-c gap-1">
                <Image
                  src="/icons/add.svg"
                  alt="logo"
                  width={20}
                  height={20}
                  className="object-contain w-6 h-6 max-sm:w-5 max-sm:h-5"
                />
                <span className="text-primary-green max-sm:text-sm">
                  Add New Business
                </span>
              </Link>
            </div>

            <div className="flex gap-2 justify-center mt-5">
              <CustomButton loading={isApplying} type="submit">
                Submit application
              </CustomButton>
            </div>
          </div>
        </form>
      </CustomModal>
    );
  }
);

export default ApplyRegularJobModal;
