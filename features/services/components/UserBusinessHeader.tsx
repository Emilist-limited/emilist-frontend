import { AnimatePresence } from "framer-motion";

import ConfirmModal from "@/components/atoms/ConfirmModal";
import EllipsisButton from "@/components/atoms/EllipsisButton";
import ActionMenuDropdown from "@/components/molecules/ActionMenuDropdown";
import JobActionDropdown from "@/features/jobs/components/JobActionDropdown";
import PromoModal from "@/components/organisms/modal/PromoModal";

import { useJobActionState } from "@/features/jobs/hooks/useJobActionState";
import { ROUTES } from "@/lib/constants/routes";
import { Capitalize } from "@/lib/helpers";
import { useDeleteService } from "../hooks/useDeleteService";
import { usePromote } from "@/lib/hooks/usePromote";

interface UserBusinessHeaderProps {
  businessTitle: string;
  businessId: string;
}

const UserBusinessHeader = ({
  businessTitle,
  businessId,
}: UserBusinessHeaderProps) => {
  const {
    showActionDropdown,
    openConfirmActionModal,
    toggleActionButton,
    toggleConfirmActionModal,
  } = useJobActionState();
  const { handleDeleteService, isDeleteLoading } = useDeleteService();
  const {
    expectedClicks,
    handleClickChange,
    target,
    setTarget,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    isLoad,
    handlePromote,
    isOpen,
    setIsOpen,
  } = usePromote();

  const onDelete = () => {
    handleDeleteService(businessId);
  };

  return (
    <div className="sm:px-10 px-4 border-b-1 border-[#B8B9B8] pb-4 space-y-1">
      <div className="flex-c-b">
        <h5 className="text-3xl font-semibold max-sm:text-xl">
          {businessTitle && Capitalize(businessTitle)}
        </h5>
        {toggleActionButton && (
          <div className="block relative">
            <EllipsisButton onClick={toggleActionButton} />
            <AnimatePresence>
              {showActionDropdown && (
                <ActionMenuDropdown>
                  <JobActionDropdown
                    href={ROUTES?.EXPERT_EDIT(businessId)}
                    onDelete={toggleConfirmActionModal}
                  />
                </ActionMenuDropdown>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>
      <button
        className="text-primary-green font-medium max-sm:text-sm py-2 underline"
        onClick={() => setIsOpen(true)}
      >
        Promote
      </button>
      <ConfirmModal
        isOpen={openConfirmActionModal}
        question="Are you sure you want to delete this business?"
        onConfirm={onDelete}
        onClose={toggleConfirmActionModal}
        loading={isDeleteLoading}
      />
      <PromoModal
        onCancel={() => setIsOpen(false)}
        isOpen={isOpen}
        expectedClicks={expectedClicks}
        handleClickChange={handleClickChange}
        target={target}
        setTarget={setTarget}
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
        isLoad={isLoad}
        handlePromote={handlePromote}
        type="service"
        id={businessId}
      />
    </div>
  );
};

export default UserBusinessHeader;
