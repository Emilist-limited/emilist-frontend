"use client";

import { Dispatch, SetStateAction } from "react";

import { FormInput } from "@/components/molecules/FormInput";

import CustomModal from "@/components/atoms/CustomModal";
import CustomButton from "@/components/atoms/CustomButton";

interface InviteModalProps {
  isOpen: boolean;
  onCancel: () => void;
  handleInviteUser: () => Promise<void>;
  isLoading: boolean;
  email: string;
  setEmail: Dispatch<SetStateAction<string>>;
}

const InviteModal = ({
  isOpen,
  onCancel,
  email,
  setEmail,
  isLoading,
  handleInviteUser,
}: InviteModalProps) => {
  const isMail = Boolean(email && email.trim());

  return (
    <CustomModal isOpen={isOpen} onClose={onCancel}>
      <form className="px-6 max-sm:px-1 py-3 w-full space-y-6">
        <h2 className="text-lg font-bold pb-5">
          Invite friends to join Emilist
        </h2>
        <FormInput
          label="Invite"
          id="email"
          name="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter invitee email..."
        />
        <CustomButton
          onClick={async () => {
            await handleInviteUser();
            onCancel();
          }}
          loading={isLoading}
          isAllInputFilled={isMail}
        >
          Proceed
        </CustomButton>
      </form>
    </CustomModal>
  );
};

export default InviteModal;
