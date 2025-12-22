import { useState } from "react";

export const useJobActionState = () => {
  const [showActionDropdown, setShowActionDropdown] = useState(false);
  const [openConfirmActionModal, setOpenConfirmActionModal] = useState(false);

  const toggleActionButton = () => {
    setShowActionDropdown((prev) => !prev);
  };

  const toggleConfirmActionModal = () => {
    setOpenConfirmActionModal((prev) => !prev);
    setShowActionDropdown(false);
  };

  return {
    showActionDropdown,
    openConfirmActionModal,
    toggleActionButton,
    toggleConfirmActionModal,
  };
};
