import { useState } from "react";
import { useOutsideClick } from "./useOutsideClick";

export const useNavbarStates = () => {
  const [openProfile, setOpenProfile] = useState(false);
  const [openSideBar, setOpenSideBar] = useState(false);
  const [openJobDropdown, setOpenJobDropdown] = useState(false);
  const [openNotification, setOpenNotification] = useState(false);
  const [openServiceDropdown, setOpenServiceDropdown] = useState(false);
  const [openProjectsDropdown, setOpenProjectsDropdown] = useState(false);
  const [openMaterialDropdown, setOpenMaterialDropdown] = useState(false);

  const toggle = () => {
    setOpenSideBar((prev) => !prev);
    setOpenProfile(false);
    setOpenNotification(false);
    setOpenServiceDropdown(false);
    setOpenMaterialDropdown(false);
    setOpenJobDropdown(false);
    setOpenProjectsDropdown(false);
  };

  const handleJobDropDown = () => {
    setOpenProfile(false);
    setOpenNotification(false);
    setOpenServiceDropdown(false);
    setOpenMaterialDropdown(false);
    setOpenProjectsDropdown(false);
    setOpenJobDropdown((prev) => !prev);
  };

  const handleMaterialDropDown = () => {
    setOpenProfile(false);
    setOpenJobDropdown(false);
    setOpenNotification(false);
    setOpenServiceDropdown(false);
    setOpenProjectsDropdown(false);
    setOpenMaterialDropdown((prev) => !prev);
  };

  const handleServiceDropDown = () => {
    setOpenProfile(false);
    setOpenJobDropdown(false);
    setOpenNotification(false);
    setOpenMaterialDropdown(false);
    setOpenProjectsDropdown(false);
    setOpenServiceDropdown((prev) => !prev);
  };

  const handleProjectDropDown = () => {
    setOpenProfile(false);
    setOpenJobDropdown(false);
    setOpenNotification(false);
    setOpenMaterialDropdown(false);
    setOpenServiceDropdown(false);
    setOpenProjectsDropdown((prev) => !prev);
  };

  const handleNotificationDropdown = () => {
    setOpenProfile(false);
    setOpenJobDropdown(false);
    setOpenServiceDropdown(false);
    setOpenMaterialDropdown(false);
    setOpenProjectsDropdown(false);
    setOpenNotification((prev) => !prev);
  };

  const handleProfileDropdown = () => {
    setOpenJobDropdown(false);
    setOpenServiceDropdown(false);
    setOpenProfile((prev) => !prev);
    setOpenMaterialDropdown(false);
    setOpenProjectsDropdown(false);
    setOpenNotification(false);
  };

  const megaMenuRef = useOutsideClick(() => {
    setOpenProfile(false);
    setOpenJobDropdown(false);
    setOpenNotification(false);
    setOpenServiceDropdown(false);
    setOpenMaterialDropdown(false);
    setOpenProjectsDropdown(false);
  });

  return {
    handleJobDropDown,
    handleMaterialDropDown,
    handleNotificationDropdown,
    handleProfileDropdown,
    handleProjectDropDown,
    handleServiceDropDown,
    toggle,
    openJobDropdown,
    openMaterialDropdown,
    openNotification,
    openProfile,
    openProjectsDropdown,
    openServiceDropdown,
    openSideBar,
    megaMenuRef,
  };
};
