"use client";

import Link from "next/link";
import { useContext, useState } from "react";

import { CompareContext } from "@/lib/context/CompareState";
import { ROUTES } from "@/lib/constants/routes";
import { useCompare } from "@/features/services/hooks/useCompare";

import CompareHeading from "../atoms/CompareHeading";
import PageLoader from "../atoms/PageLoader";
import CompareText from "../atoms/CompareText";
import CompareBusinessTableHeader from "./CompareBusinessTableHeader";
import CompareBusinessCard from "./CompareBusinessCard";
import ContactExpertModal from "./modal/ContactExpertModal";

const CompareBusinessWrapper = () => {
  const { compare } = useCompare();
  const { compareLoading, compareServices } = useContext(CompareContext);

  const [openModal, setOpenModal] = useState<boolean>(false);
  const [selectedBusiness, setSelectedBusiness] = useState<any>({});

  const handleContactClick = (userId: string) => {
    setOpenModal(true);
    setSelectedBusiness(userId);
  };

  return (
    <div className="pt-10 padding-ctn">
      <CompareHeading title="Compare" />
      {compareLoading ? (
        <PageLoader />
      ) : (
        <div className="relative flex my-10">
          {compareServices?.length > 0 ? (
            <>
              <CompareBusinessTableHeader />
              <div className="sm:w-52 w-28" />
              <div className="flex-1 w-full flex overflow-x-auto">
                {compareServices?.map((expert: any, index: number) => (
                  <CompareBusinessCard
                    key={index}
                    expert={expert}
                    onContactClick={handleContactClick}
                    onRemove={compare}
                  />
                ))}
              </div>
            </>
          ) : (
            <div className="flex-c text-lg">
              <CompareText>
                No business added to compare list.{" "}
                <Link
                  href={ROUTES?.DASHBOARD_EXPERT}
                  className="text-primary-green"
                >
                  Click here
                </Link>{" "}
                to see all businesses.
              </CompareText>
            </div>
          )}
        </div>
      )}
      <ContactExpertModal
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
        user={selectedBusiness}
      />
    </div>
  );
};

export default CompareBusinessWrapper;
