import { ROUTES } from "@/lib/constants/routes";

export const projectsMegaMenuItems = [
  {
    label: "Active Projects",
    link: ROUTES?.DASHBOARD_PROJECT_ACTIVE,
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 24 24"
        className="w-6 h-6"
      >
        <path
          fillRule="evenodd"
          d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM9.763 9.51a2.25 2.25 0 0 1 3.828-1.351.75.75 0 0 0 1.06-1.06 3.75 3.75 0 0 0-6.38 2.252c-.033.307 0 .656.064.984.125.59.398 1.113.83 1.545l-1.254 1.255a.75.75 0 1 0 1.06 1.06l1.306-1.306A4.5 4.5 0 0 0 12.75 15a.75.75 0 0 0 0-1.5 3 3 0 0 1-1.446-.362l3.355-3.355a.75.75 0 1 0-1.06-1.06l-3.355 3.355a2.99 2.99 0 0 1-.794-1.968Z"
          clipRule="evenodd"
        />
      </svg>
    ),
    description:
      "View jobs where your application has been accepted, now active and in progress.",
  },
  {
    label: "Paused Projects",
    link: ROUTES?.DASHBOARD_PROJECT_PAUSED,
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 24 24"
        className="w-6 h-6"
      >
        <path
          fillRule="evenodd"
          d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12ZM9 8.25a.75.75 0 0 0-.75.75v6a.75.75 0 0 0 1.5 0V9a.75.75 0 0 0-.75-.75Zm6 0a.75.75 0 0 0-.75.75v6a.75.75 0 0 0 1.5 0V9a.75.75 0 0 0-.75-.75Z"
          clipRule="evenodd"
        />
      </svg>
    ),
    description:
      "See active jobs that have been paused due to reasons agreed upon with the job owner.",
  },
  {
    label: "Overdue Projects",
    link: ROUTES?.DASHBOARD_PROJECT_OVERDUE,
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 24 24"
        className="w-6 h-6"
      >
        <path
          fillRule="evenodd"
          d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 6a.75.75 0 0 0-1.5 0v6c0 .028.002.055.005.082a.75.75 0 0 0 1.5-.082V6Z"
          clipRule="evenodd"
        />
      </svg>
    ),
    description:
      "Track projects that have passed their due dates and require attention.",
  },
  {
    label: "Completed Projects",
    link: ROUTES?.DASHBOARD_PROJECT_COMPLETE,
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 24 24"
        className="w-6 h-6"
      >
        <path
          fillRule="evenodd"
          d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
          clipRule="evenodd"
        />
      </svg>
    ),
    description: "Review all your successfully completed projects.",
  },
];

export const projectLinks = [
  { id: 2, name: "new", link: ROUTES?.DASHBOARD_PROJECT_NEW },
  { id: 3, name: "active", link: ROUTES?.DASHBOARD_PROJECT_ACTIVE },
  { id: 4, name: "overdue", link: ROUTES?.DASHBOARD_PROJECT_OVERDUE },
  { id: 5, name: "paused", link: ROUTES?.DASHBOARD_PROJECT_PAUSED },
  { id: 6, name: "completed", link: ROUTES?.DASHBOARD_PROJECT_COMPLETE },
];
