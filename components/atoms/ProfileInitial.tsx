import { ProfileInitialProps } from "@/types";

const ProfileInitial = ({ initial, className }: ProfileInitialProps) => (
  <div
    className={`rounded-full bg-gray-100 flex items-center justify-center ${className}`}
  >
    <span className="text-gray-600 font-medium">{initial}</span>
  </div>
);

export default ProfileInitial;
