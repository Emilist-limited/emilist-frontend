import { ROUTES } from "@/lib/constants/routes";

export const jobMegaMenuItems = [
  {
    label: "Ongoing Jobs",
    link: ROUTES?.DASHBOARD_JOB_NEW,
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 24 24"
        className="w-6 h-6"
      >
        <path d="M7.5 3.375c0-1.036.84-1.875 1.875-1.875h.75a3.75 3.75 0 0 1 3.75 3.75v1.875C13.125 8.25 12.054 9 10.875 9H8.25a4.125 4.125 0 0 1-4.125-4.125V4.5c0-1.036.84-1.875 1.875-1.875h1.5ZM8.25 8.25a2.625 2.625 0 0 0 2.625 2.625h.75a2.625 2.625 0 0 0 2.625-2.625V6.375a2.25 2.25 0 0 0-2.25-2.25h-.75a.375.375 0 0 0-.375.375v.75c0 .621-.504 1.125-1.125 1.125h-1.5a1.125 1.125 0 0 1-1.125-1.125v-.75ZM18.75 7.5v1.125c0 .621-.504 1.125-1.125 1.125h-1.5a1.125 1.125 0 0 1-1.125-1.125V7.5c0-.621.504-1.125 1.125-1.125h1.5c.621 0 1.125.504 1.125 1.125ZM3.75 12.75a1.125 1.125 0 0 1 1.125-1.125h1.5c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125h-1.5A1.125 1.125 0 0 1 3.75 14.25v-1.5Zm6.75 0a1.125 1.125 0 0 1 1.125-1.125h1.5c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5Zm6.75 0a1.125 1.125 0 0 1 1.125-1.125h1.5c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5ZM3.75 18.75a1.125 1.125 0 0 1 1.125-1.125h1.5c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5Zm6.75 0a1.125 1.125 0 0 1 1.125-1.125h1.5c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5Zm6.75 0a1.125 1.125 0 0 1 1.125-1.125h1.5c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5Z" />
      </svg>
    ),
    description:
      "Monitor your ongoing jobs, including pending, active, paused, overdue and completed jobs.",
  },
  {
    label: "List New Job",
    link: ROUTES?.LIST_NEW_JOB,
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 24 24"
        className="w-6 h-6"
      >
        <path
          fillRule="evenodd"
          d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 9a.75.75 0 0 0-1.5 0v2.25H9a.75.75 0 0 0 0 1.5h2.25V15a.75.75 0 0 0 1.5 0v-2.25H15a.75.75 0 0 0 0-1.5h-2.25V9Z"
          clipRule="evenodd"
        />
      </svg>
    ),
    description:
      "Post new biddable or regular jobs that anyone can view and apply to.",
  },
  {
    label: "Direct Contract",
    link: ROUTES?.LIST_DIRECT_JOB,
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 24 24"
        className="w-6 h-6"
      >
        <path
          fillRule="evenodd"
          d="M7.5 5.25a3 3 0 0 1 3-3h3a3 3 0 0 1 3 3v.205c.933.085 1.857.197 2.774.334 1.454.218 2.476 1.483 2.476 2.917v3.033c0 1.211-.734 2.352-1.936 2.647A24.726 24.726 0 0 1 12 15.75c-2.73 0-5.357-.442-7.814-1.259-1.202-.295-1.936-1.436-1.936-2.647V8.811c0-1.434 1.022-2.7 2.476-2.917A48.814 48.814 0 0 1 7.5 5.455V5.25Zm7.5 0v.09a49.488 49.488 0 0 0-6 0v-.09a1.5 1.5 0 0 1 1.5-1.5h3a1.5 1.5 0 0 1 1.5 1.5Zm-3 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z"
          clipRule="evenodd"
        />
        <path d="M3 18.4v-2.796a4.3 4.3 0 0 0 .713.31A26.226 26.226 0 0 0 12 17.25c2.892 0 5.68-.468 8.287-1.335.252-.084.496-.17.713-.311V18.4c0 1.452-1.047 2.728-2.523 2.923-2.12.282-4.282.427-6.477.428-2.195 0-4.357-.146-6.477-.428C4.047 21.128 3 19.852 3 18.4Z" />
      </svg>
    ),
    description:
      "Create a job for a specific artisan, visible only to the assigned user.",
  },
  {
    label: "Planned Maintenance",
    link: ROUTES?.PLANNED_MAINTENANCE,
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 24 24"
        className="w-6 h-6"
      >
        <path
          fillRule="evenodd"
          d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 6a.75.75 0 0 0-1.5 0v.816a3.836 3.836 0 0 0-1.72.756c-.712.566-1.112 1.35-1.112 2.178 0 .829.4 1.612 1.113 2.178.383.304.84.497 1.344.645l.072.019v2.408a.75.75 0 0 0 1.5 0v-2.408l.072-.019c.503-.148.961-.341 1.344-.645.712-.566 1.112-1.35 1.112-2.179 0-.828-.4-1.612-1.113-2.178a3.835 3.835 0 0 0-1.719-.756V6Z"
          clipRule="evenodd"
        />
      </svg>
    ),
    description:
      "Schedule jobs on a recurring basis, such as weekly, monthly, or quarterly, to meet your ongoing needs.",
  },
  {
    label: "All Listed Jobs",
    link: ROUTES?.DASHBOARD_JOB,
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 24 24"
        className="w-6 h-6"
      >
        <path
          fillRule="evenodd"
          d="M2.25 6.75c0-.621.504-1.125 1.125-1.125h17.25c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125H3.375c-.621 0-1.125-.504-1.125-1.125v-1.5Zm0 6c0-.621.504-1.125 1.125-1.125h17.25c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125H3.375c-.621 0-1.125-.504-1.125-1.125v-1.5Zm0 6c0-.621.504-1.125 1.125-1.125h17.25c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125H3.375c-.621 0-1.125-.504-1.125-1.125v-1.5Z"
          clipRule="evenodd"
        />
      </svg>
    ),
    description:
      "Browse all listed jobs, including yours and those posted by others.",
  },
  {
    label: "My Listed Jobs",
    link: ROUTES?.DASHBOARD_USER_JOBS,
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 24 24"
        className="w-6 h-6"
      >
        <path
          fillRule="evenodd"
          d="M5.625 1.5c-1.036 0-1.875.84-1.875 1.875v17.25c0 1.035.84 1.875 1.875 1.875h12.75c1.035 0 1.875-.84 1.875-1.875V12.75A3.75 3.75 0 0 0 16.5 9h-1.875a1.875 1.875 0 0 1-1.875-1.875V5.25A3.75 3.75 0 0 0 9 1.5H5.625ZM7.5 15a.75.75 0 0 1 .75-.75h7.5a.75.75 0 0 1 0 1.5h-7.5A.75.75 0 0 1 7.5 15Zm.75 2.25a.75.75 0 0 0 0 1.5h7.5a.75.75 0 0 0 0-1.5h-7.5Z"
          clipRule="evenodd"
        />
        <path d="M12.971 1.816A5.23 5.23 0 0 1 14.25 5.25v1.875c0 .207.168.375.375.375H16.5a5.23 5.23 0 0 1 3.434 1.279 9.768 9.768 0 0 0-6.963-6.963Z" />
      </svg>
    ),
    description: "View only the jobs you have posted.",
  },
  {
    label: "Applications",
    link: ROUTES?.DASHBOARD_APPLIED_JOBS,
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 24 24"
        className="w-6 h-6"
      >
        <path d="M1.5 8.67v8.58a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V8.67l-8.928 5.493a3 3 0 0 1-3.144 0L1.5 8.67Z" />
        <path d="M22.5 6.908V6.75a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3v.158l9.714 5.978a1.5 1.5 0 0 0 1.572 0L22.5 6.908Z" />
      </svg>
    ),
    description: "See all the jobs you have applied to.",
  },
  {
    label: "Saved Jobs",
    link: ROUTES?.DASHBOARD_SAVED_JOBS,
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 24 24"
        className="w-6 h-6"
      >
        <path
          fillRule="evenodd"
          d="M6.32 2.577a2.25 2.25 0 0 1 1.683-.577h8.195a2.25 2.25 0 0 1 1.683.577A2.25 2.25 0 0 1 18 4.25v17.385l-5.207-3.855a3.75 3.75 0 0 0-4.586 0L3 21.635V4.25a2.25 2.25 0 0 1 .32-1.673ZM8.25 3.75a.75.75 0 0 0-.75.75v12.846l4.5-3.333a2.25 2.25 0 0 1 2.743 0l4.5 3.333V4.5a.75.75 0 0 0-.75-.75H8.25Z"
          clipRule="evenodd"
        />
      </svg>
    ),
    description: "Access jobs you have saved or liked for future reference.",
  },
  {
    label: "My Recurring Jobs",
    link: ROUTES?.RECURRING_JOBS,
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 24 24"
        className="w-6 h-6"
      >
        <path
          fillRule="evenodd"
          d="M5.625 1.5c-1.036 0-1.875.84-1.875 1.875v17.25c0 1.035.84 1.875 1.875 1.875h12.75c1.035 0 1.875-.84 1.875-1.875V12.75A3.75 3.75 0 0 0 16.5 9h-1.875a1.875 1.875 0 0 1-1.875-1.875V5.25A3.75 3.75 0 0 0 9 1.5H5.625ZM7.5 15a.75.75 0 0 1 .75-.75h7.5a.75.75 0 0 1 0 1.5h-7.5A.75.75 0 0 1 7.5 15Zm.75 2.25a.75.75 0 0 0 0 1.5h7.5a.75.75 0 0 0 0-1.5h-7.5Z"
          clipRule="evenodd"
        />
        <path d="M12.971 1.816A5.23 5.23 0 0 1 14.25 5.25v1.875c0 .207.168.375.375.375H16.5a5.23 5.23 0 0 1 3.434 1.279 9.768 9.768 0 0 0-6.963-6.963Z" />
      </svg>
    ),
    description: "Access all scheduled jobs you have for future reference.",
  },
];

export const JobLinks = [
  { id: 1, name: "lead", link: ROUTES?.DASHBOARD_JOB_LEAD },
  { id: 2, name: "new", link: ROUTES?.DASHBOARD_JOB_NEW },
  { id: 3, name: "active", link: ROUTES?.DASHBOARD_JOB_ACTIVE },
  { id: 4, name: "overdue", link: ROUTES?.DASHBOARD_JOB_OVERDUE },
  { id: 5, name: "paused", link: ROUTES?.DASHBOARD_JOB_PAUSED },
  { id: 6, name: "completed", link: ROUTES?.DASHBOARD_JOB_COMPLETED },
];

export const recommend = [
  {
    label: "Yes",
    value: "Yes",
  },
  {
    label: "No",
    value: "No",
  },
  {
    label: "Maybe",
    value: "Maybe",
  },
];

export const initialFormState = {
  invite: "",
  category: "",
  narrow: "",
  projectTitle: "",
  description: "",
  projectDuration: "",
  projectDurationType: "day",
  budget: "",
  currency: "NGN",
  expertLevel: "four",
  milestonesnumber: 1,
};
