import { ReactNode } from "react";

const GuideDescription = ({ children }: { children: ReactNode }) => {
  return <p className="text-xs text-primary-green">{children}</p>;
};

export default GuideDescription;
