interface UserNameProps {
  userName?: string;
  firstName?: string;
  lastName?: string;
}

const UserName = ({ firstName, lastName, userName }: UserNameProps) => {
  return (
    <h6 className="sm:text-lg font-semibold capitalize">
      {firstName && lastName ? `${firstName} ${lastName}` : userName}
    </h6>
  );
};

export default UserName;
