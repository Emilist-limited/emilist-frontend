import Link from "next/link";
import { Dispatch, SetStateAction } from "react";

import { AnimatePresence, motion } from "framer-motion";

import ConfirmModal from "@/components/atoms/ConfirmModal";
import EllipsisButton from "@/components/atoms/EllipsisButton";
import ActionMenuDropdown from "@/components/molecules/ActionMenuDropdown";
import JobActionDropdown from "@/features/jobs/components/JobActionDropdown";

import { Capitalize } from "@/lib/helpers";
import { ROUTES } from "@/lib/constants/routes";
import { useJobActionState } from "@/features/jobs/hooks/useJobActionState";

interface UserMaterialHeaderProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  isLoading: boolean;
  discountPrice: string;
  handleChangeDiscountPrice: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleAddDiscountPrice: () => void;
  productName: string;
  materialId: string;
  handleDeleteMaterial: () => void;
  isDeleting: boolean;
}

const UserMaterialHeader = ({
  isOpen,
  setIsOpen,
  isLoading,
  discountPrice,
  handleChangeDiscountPrice,
  handleAddDiscountPrice,
  productName,
  materialId,
  handleDeleteMaterial,
  isDeleting,
}: UserMaterialHeaderProps) => {
  const {
    showActionDropdown,
    openConfirmActionModal,
    toggleActionButton,
    toggleConfirmActionModal,
  } = useJobActionState();

  return (
    <section className="flex justify-between p-6 border-b border-[#D0CFCF] max-sm:p-4">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold  max-sm:text-xl">
          {productName && Capitalize(productName)}
        </h1>
        <div className="flex item-center gap-4 flex-wrap">
          <Link
            href={ROUTES?.REPORT_INSIGHT}
            className="max-sm:text-sm font-semibold text-primary-green p"
          >
            View Insights
          </Link>
          <div className="">
            <button
              className="text-start text-[#ff9933] font-semibold hover:text-[#e99847] transition-all duration-300"
              onClick={() => setIsOpen((prev) => !prev)}
            >
              Add discount
            </button>
            <AnimatePresence>
              {isOpen && (
                <>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="flex-c gap-2 pt-2 pb-1"
                  >
                    <input
                      type="text"
                      name="discount"
                      id="discount"
                      value={discountPrice}
                      className="bg-[#f6ffec] outline-none focus:border-primary-green border-1 rounded-md px-2 py-1"
                      placeholder="Enter discounted price"
                      onChange={handleChangeDiscountPrice}
                      style={{ fontSize: "16px" }}
                    />
                    <button
                      className={`w-14 h-8 text-white bg-[#054753] rounded-md ${
                        isLoading
                          ? "opacity-45 cursor-not-allowed"
                          : "hover:bg-[#054753]/90 transition-all duration-300"
                      }`}
                      type="button"
                      onClick={handleAddDiscountPrice}
                    >
                      {isLoading ? (
                        <span className="loading loading-spinner loading-xs"></span>
                      ) : (
                        "Save"
                      )}
                    </button>
                  </motion.div>
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-xs text-dark-green"
                  >
                    Discount price shouldn't exceed original price
                  </motion.p>
                </>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
      <div className="relative">
        <EllipsisButton onClick={toggleActionButton} />
        <AnimatePresence>
          {showActionDropdown && (
            <ActionMenuDropdown>
              <JobActionDropdown
                href={ROUTES?.EDIT_MATERIAL(materialId)}
                onDelete={toggleConfirmActionModal}
              />
            </ActionMenuDropdown>
          )}
        </AnimatePresence>
      </div>
      <ConfirmModal
        isOpen={openConfirmActionModal}
        question="Are you sure you want to delete this material?"
        onConfirm={handleDeleteMaterial}
        onClose={toggleConfirmActionModal}
        loading={isDeleting}
      />
    </section>
  );
};

export default UserMaterialHeader;
