"use client";

import dynamic from "next/dynamic";
import { memo, useContext, useMemo, useState } from "react";

import { AnimatePresence } from "framer-motion";

import ApplicantProfile from "./ApplicantProfile";
import EllipsisButton from "@/components/atoms/EllipsisButton";

import { AuthContext } from "@/lib/context/AuthState";
import { levelCount } from "@/lib/constants";
import { LevelType } from "@/types";

const JobApplicantActionDropdown = dynamic(
  () => import("./JobApplicantActionDropdown")
);

interface ApplicantsProps {
  jobInfo: any;
  isJobOwner: boolean;
  getJobInfo: () => Promise<void>;
}

const Applicants = memo(
  ({ isJobOwner, jobInfo, getJobInfo }: ApplicantsProps) => {
    const { currentUser } = useContext(AuthContext);

    const [isOpen, setIsOpen] = useState(false);
    const [openUserDropdown, setOpenUserDropdown] = useState<{
      isOpen: boolean;
      applicantIndex: number | null;
    }>({ isOpen: false, applicantIndex: null });

    const onCancel = () => setIsOpen(false);

    const toggleUserDropdown = (index: number) => {
      setOpenUserDropdown((prev) => ({
        isOpen: !prev.isOpen,
        applicantIndex: prev.isOpen ? null : index,
      }));
    };

    const { isAnyAccepted, acceptedApplicantId } = useMemo(() => {
      const acceptedApplicant = jobInfo?.applications?.find(
        (applicant: any) => applicant.status === "accepted"
      );
      return {
        isAnyAccepted: Boolean(acceptedApplicant),
        acceptedApplicantId: acceptedApplicant?.user?._id || null,
      };
    }, [jobInfo?.applications]);

    return (
      <>
        {jobInfo?.applications?.length > 0 && (
          <div className=" bg-white w-full rounded-lg py-6">
            <h5 className="sm:text-lg font-semibold mb-5 px-5">Applicants</h5>
            <div className="flex lg:flex-col flex-row overflow-x-scroll">
              {jobInfo?.applications?.map((applicant: any, index: number) => {
                const applicationLength = jobInfo?.applications?.length;
                const { level, rating } = levelCount[
                  applicant?.user?.level as LevelType
                ] || {
                  level: "Level 5",
                  rating: 5,
                };

                return (
                  <div
                    className="lg:w-full max-lg:min-w-[300px] w-[300px] flex max-lg:shadow-md px-5 max-lg:px-3 py-6 hover:bg-gray-50 transition-all duration-300 group"
                    key={index}
                  >
                    <ApplicantProfile
                      status={applicant?.status}
                      businessId={applicant?.businessId}
                      isNotAcceptedApplicant={
                        isAnyAccepted &&
                        acceptedApplicantId !== applicant?.user?._id
                      }
                      profileImage={applicant?.user?.profileImage}
                      name={
                        applicant.user.fullName || applicant?.user?.userName
                      }
                      level={level}
                      rating={rating}
                      currency={jobInfo?.currency}
                      maximumPrice={applicant?.biddableDetails?.maximumPrice}
                      type={jobInfo?.type}
                      applicantOrJobOwner={
                        currentUser?._id === applicant?.user?._id || isJobOwner
                      }
                    />
                    {isJobOwner && !isAnyAccepted && (
                      <div className="block relative h-fit">
                        <EllipsisButton
                          onClick={() => toggleUserDropdown(index)}
                        />
                        <AnimatePresence>
                          {openUserDropdown.isOpen && (
                            <JobApplicantActionDropdown
                              openUserDropdown={openUserDropdown.isOpen}
                              index={index}
                              applicantIndex={openUserDropdown.applicantIndex}
                              isAnyAccepted={isAnyAccepted}
                              applicant={applicant}
                              getJobInfo={getJobInfo}
                              setIsOpen={setIsOpen}
                              isOpen={isOpen}
                              onCancel={onCancel}
                              applicationLength={applicationLength}
                              jobInfo={jobInfo}
                            />
                          )}
                        </AnimatePresence>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </>
    );
  }
);

export default Applicants;
