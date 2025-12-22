"use client";

import { motion } from "framer-motion";

import { container } from "@/anim";
import { useChangePassword } from "../hooks/useChangePassword";
import { useDeactivateUser } from "../hooks/useDeactivateUser";
import { PasswordInput } from "@/components/molecules/PasswordInput";

import WhiteBgLoader from "@/components/atoms/WhiteBgLoader";
import ConfirmModal from "@/components/atoms/ConfirmModal";

const UserSecurity = () => {
  const { handleDeactivateUser, isLoading, onToggleModal, isOpen } =
    useDeactivateUser();
  const {
    loading,
    handleChange,
    handleSubmit,
    password,
    setEdit,
    edit,
    type,
    toggleType,
  } = useChangePassword();

  const isSubmitting = loading || isLoading;

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-2 pt-14 pb-44"
    >
      {isSubmitting && <WhiteBgLoader />}
      <div className="col-span-1 max-sm:col-span-2 flex-col flex gap-6">
        {/* <div className="w-full border-b-1 border-[#CBD5E1]">
          <div className="flex justify-between mb-2">
            <h5 className="text-lg  font-semibold  max-sm:text-sm">Email</h5>
            <button className="transition-all text-[#FF5D7A] hover:text-pink-600  font-semibold  max-sm:text-sm">
              Unsubscribe
            </button>
          </div>
          <p className="max-sm:text-xs capitalize mb-1 mt-5">
            {currentUser?.email ? currentUser?.email : "Not subscribed"}
          </p>
        </div> */}
        <div className="w-full space-y-4">
          <div className="flex justify-between">
            <h5 className="text-lg text-[#304155] font-semibold  max-sm:text-sm">
              Change Password
            </h5>
            {edit ? (
              <button
                className=" text-primary-green font-semibold  max-sm:text-sm"
                onClick={handleSubmit}
              >
                Save
              </button>
            ) : (
              <button
                className=" text-primary-green font-semibold  max-sm:text-sm"
                onClick={() => setEdit(true)}
              >
                Change
              </button>
            )}
          </div>

          {edit && (
            <>
              <PasswordInput
                id="currentPassword"
                name="currentPassword"
                label="Current Password"
                value={password.currentPassword}
                onChange={handleChange}
                inputType={type}
                toggleInputType={toggleType}
                placeholder="Enter your current password"
              />
              <PasswordInput
                id="newPassword"
                name="newPassword"
                label="New Password"
                value={password.newPassword}
                onChange={handleChange}
                inputType={type}
                toggleInputType={toggleType}
                placeholder="Enter your new password"
              />
            </>
          )}
        </div>
        <div className="">
          <button
            className="transition-all text-[#FF5D7A] hover:text-pink-600  font-semibold  max-sm:text-sm"
            onClick={onToggleModal}
          >
            Deactivate account
          </button>
          <ConfirmModal
            isOpen={isOpen}
            onClose={onToggleModal}
            onConfirm={handleDeactivateUser}
            question="Are you sure you want to deactivate your account?"
            loading={isLoading}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default UserSecurity;
