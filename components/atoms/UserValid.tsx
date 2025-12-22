import React from "react";

const UserValid = ({
  isUserValid,
  value,
}: {
  isUserValid: boolean | null;
  value: string | undefined;
}) => {
  return (
    <p
      id="invite-feedback"
      className={`text-xs ${
        isUserValid === null && value
          ? "text-gray-500"
          : isUserValid === true
          ? "text-dark-green"
          : isUserValid === false
          ? "text-red-600"
          : "text-red-600"
      }`}
    >
      {isUserValid === null && value
        ? "Verifying user..."
        : isUserValid === true
        ? "User is valid!"
        : isUserValid === false
        ? "Invalid user. Please check the email or username."
        : "Please enter username of worker."}
    </p>
  );
};

export default UserValid;
