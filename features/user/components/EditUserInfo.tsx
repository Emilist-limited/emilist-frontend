import CustomButton from "@/components/atoms/CustomButton";
import UserInput from "./UserInput";

import { ProfileDetail } from "../types";
import { useContext } from "react";
import { AuthContext } from "@/lib/context/AuthState";

interface EditUserInfoProps {
  handleEdit: () => void;
  profileDetails: ProfileDetail;
  handleCancel: () => void;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  editingField: boolean;
  handleUpdate: () => Promise<void>;
}

const EditUserInfo = ({
  handleEdit,
  profileDetails,
  handleCancel,
  handleChange,
  editingField,
  handleUpdate,
}: EditUserInfoProps) => {
  const { currentUser } = useContext(AuthContext);

  return (
    <div className="space-y-6">
      <div className="flex-c justify-end py-4">
        <CustomButton onClick={handleEdit}>Edit profile</CustomButton>
      </div>
      <div className="grid md:grid-cols-2 grid-cols-1 gap-10">
        <UserInput
          title="Username"
          id="userName"
          value={currentUser?.userName}
        />
        <UserInput
          title="Unique ID"
          id="uniqueId"
          value={currentUser?.uniqueId}
        />
        <UserInput title="Email" id="email" value={currentUser?.email} />
        <UserInput
          title="Full Name"
          id="fullName"
          value={profileDetails?.fullName}
          handleChange={handleChange}
          editingField={editingField}
        />
        <UserInput
          title="Phone Number 1"
          id="number1"
          value={profileDetails?.number1}
          handleChange={handleChange}
          editingField={editingField}
        />
        <UserInput
          title="Phone Number 2"
          id="number2"
          value={profileDetails?.number2}
          handleChange={handleChange}
          editingField={editingField}
        />
        <UserInput
          title="Whatsapp Number"
          id="whatsAppNo"
          value={profileDetails?.whatsAppNo}
          handleChange={handleChange}
          editingField={editingField}
        />
        <UserInput
          title="Location"
          id="location"
          value={profileDetails?.location}
          handleChange={handleChange}
          editingField={editingField}
        />
        <UserInput
          title="Gender"
          id="gender"
          value={profileDetails?.gender}
          handleChange={handleChange}
          editingField={editingField}
        />
        <UserInput
          title="Bio"
          id="bio"
          value={profileDetails?.bio}
          handleChange={handleChange}
          editingField={editingField}
        />
        <UserInput
          title="Language"
          id="language"
          value={profileDetails?.language}
          handleChange={handleChange}
          editingField={editingField}
        />
      </div>
      <div className="flex gap-6">
        {editingField ? (
          <>
            <CustomButton onClick={handleUpdate}>Save changes</CustomButton>
            <button
              className="bg-slate-200 text-red-500 whitespace-nowrap transition-all duration-300 rounded-lg px-6 py-3 text-center"
              onClick={handleCancel}
            >
              Cancel
            </button>
          </>
        ) : (
          <CustomButton onClick={handleEdit}>Edit profile</CustomButton>
        )}
      </div>
    </div>
  );
};

export default EditUserInfo;
