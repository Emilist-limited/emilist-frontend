"use client";

import Link from "next/link";
import { useContext } from "react";

import { AuthContext } from "@/lib/context/AuthState";
import { dashboardMegaMenuItems } from "@/types";
import { ROUTES } from "@/lib/constants/routes";
import { ServiceProps } from "@/features/services/types";

import AppPromotion from "../organisms/AppPromotion";
import NoMoreMessage from "../atoms/NoMoreMessage";

interface DashboardMegaMenuContentProps {
  megaMenuItems: dashboardMegaMenuItems[];
  services?: boolean;
  showMobileApp?: boolean;
}

const DashboardMegaMenuContent = ({
  megaMenuItems,
  services,
  showMobileApp,
}: DashboardMegaMenuContentProps) => {
  const { currentUser } = useContext(AuthContext);
  return (
    <div className="flex justify-between gap-10 2xl:padding-ctn">
      <div
        className={`w-full grid  md:grid-cols-4 gap-10 py-6 xl:pl-[6rem] lg:pl-[4rem] sm:pl-[2rem] pl-3 ${
          showMobileApp ? "lg:grid-cols-4" : "lg:grid-cols-6"
        }`}
      >
        {services && (
          <div className="col-span-2 w-full p-4 flex gap-4">
            <div className="text-primary-green w-fit">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
                className="w-6 h-6"
              >
                <path
                  fillRule="evenodd"
                  d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM9 7.5a.75.75 0 0 0 0 1.5h1.5V10.5H9a.75.75 0 0 0 0 1.5h1.5V13.5H9a.75.75 0 0 0 0 1.5h1.5v1.5a.75.75 0 0 0 1.5 0v-1.5h1.5a.75.75 0 0 0 0-1.5h-1.5v-1.5h1.5a.75.75 0 0 0 0-1.5h-1.5V9h1.5a.75.75 0 0 0 0-1.5H9Z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="flex-1 space-y-2">
              <h6 className="font-medium">Services</h6>
              <p className="text-sm">
                Below are all your listed services/businesses, click to view
                details of each.
              </p>
              {currentUser?.businesses?.length < 1 ||
              !currentUser?.businesses ? (
                <NoMoreMessage message="You haven't listed any service yet. Add service to add your service(s)." />
              ) : (
                <ul className="space-y-1 pt-2">
                  {currentUser?.businesses?.map((service: ServiceProps) => (
                    <li key={service?._id}>
                      <Link
                        href={ROUTES?.DASHBOARD_SERVICE_INFO(service?._id)}
                        className="text-sm text-primary-orange hover:text-primary-green transition-all duration-300 ease-out"
                      >
                        {service?.businessName}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        )}

        {megaMenuItems?.map((item) => (
          <Link
            href={item?.link}
            key={item?.label}
            className="col-span-2 w-full p-4 flex gap-4 hover:bg-light-green transition-all duration-300 ease-out"
          >
            <div className="text-primary-green w-fit">{item?.icon}</div>
            <div className="flex-1 space-y-2">
              <h6 className="font-medium">{item?.label}</h6>
              <p className="text-sm">{item?.description}</p>
            </div>
          </Link>
        ))}
      </div>
      {showMobileApp && (
        <div className="w-fit p-4 bg-light-green 2xl:p-4 max-xl:py-6 xl:pr-[6rem] lg:pr-[4rem] sm:pr-[2rem] pr-3">
          <AppPromotion />
        </div>
      )}
    </div>
  );
};

export default DashboardMegaMenuContent;
