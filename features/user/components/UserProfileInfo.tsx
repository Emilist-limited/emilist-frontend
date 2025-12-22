"use  client";

import { motion } from "framer-motion";

import { container } from "@/anim";
import { useEditProfile } from "../hooks/useEditProfile";

import PageLoader from "@/components/atoms/PageLoader";
import WhiteBgLoader from "@/components/atoms/WhiteBgLoader";
import EditUserProfileAvatar from "./EditUserProfileAvatar";
import EditUserInfo from "./EditUserInfo";

const UserProfileInfo = () => {
  const {
    profileDetails,
    handleUpdate,
    handleCancel,
    handleEdit,
    editingField,
    loading,
    load,
    profileImage,
    handleChangeFile,
    currentImage,
    handleChange,
    showSave,
  } = useEditProfile();

  return (
    <motion.div variants={container} initial="hidden" animate="visible">
      {loading && <WhiteBgLoader />}
      {load ? (
        <PageLoader height="h-[60vh]" />
      ) : (
        <div>
          <EditUserProfileAvatar
            currentImage={currentImage}
            handleChangeFile={handleChangeFile}
            profileImage={profileImage}
            handleUpdate={handleUpdate}
            showSave={showSave}
          />
          <EditUserInfo
            profileDetails={profileDetails}
            handleCancel={handleCancel}
            handleChange={handleChange}
            handleEdit={handleEdit}
            editingField={editingField}
            handleUpdate={handleUpdate}
          />
        </div>
      )}
    </motion.div>
  );
};

export default UserProfileInfo;
