import { ROUTES } from "@/lib/constants/routes";

export const materialsMegaMenuItems = [
  {
    label: "All Listed Materials",
    link: ROUTES?.DASHBOARD_MATERIAL,
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 24 24"
        className="w-6 h-6"
      >
        <path
          fillRule="evenodd"
          d="M2.25 6.75c0-.621.504-1.125 1.125-1.125h17.25c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125H3.375c-.621 0-1.125-.504-1.125-1.125v-1.5Zm0 6c0-.621.504-1.125 1.125-1.125h17.25c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125H3.375c-.621 0-1.125-.504-1.125-1.125v-1.5Zm0 6c0-.621.504-1.125 1.125-1.125h17.25c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125H3.375c-.621 0-1.125-.395-1.125-1.016v-1.484Z"
          clipRule="evenodd"
        />
      </svg>
    ),
    description: "Browse all materials listed by you and other users.",
  },
  {
    label: "My Listed Materials",
    link: ROUTES?.DASHOBOARD_MY_MATERIALS,
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
    description: "View only the materials you have listed.",
  },
  {
    label: "List New Materials",
    link: ROUTES?.LIST_NEW_MATERIAL,
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
    description: "Add new materials to your listings for others to view.",
  },
  {
    label: "Saved Materials",
    link: ROUTES?.DASHBOARD_SAVED_MATERIAL,
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
    description:
      "Check out all the materials you have liked or saved for later.",
  },
];

export const buildingMaterials = [
  {
    id: 1,
    label: "Cement",
    value: "Cement",
    subCategory: [
      { label: "Ordinary Portland Cement", value: "Ordinary Portland Cement" },
      { label: "White Cement", value: "White Cement" },
      { label: "Rapid Hardening Cement", value: "Rapid Hardening Cement" },
    ],
  },
  {
    id: 2,
    label: "Bricks",
    value: "Bricks",
    subCategory: [
      { label: "Clay Bricks", value: "Clay Bricks" },
      { label: "Concrete Bricks", value: "Concrete Bricks" },
      { label: "Fly Ash Bricks", value: "Fly Ash Bricks" },
    ],
  },
  {
    id: 3,
    label: "Concrete",
    value: "Concrete",
    subCategory: [
      { label: "Reinforced Concrete", value: "Reinforced Concrete" },
      { label: "Precast Concrete", value: "Precast Concrete" },
      { label: "Lightweight Concrete", value: "Lightweight Concrete" },
    ],
  },
  {
    id: 4,
    label: "Steel",
    value: "Steel",
    subCategory: [
      { label: "Structural Steel", value: "Structural Steel" },
      { label: "Reinforcing Steel", value: "Reinforcing Steel" },
      { label: "Stainless Steel", value: "Stainless Steel" },
    ],
  },
  {
    id: 5,
    label: "Sand",
    value: "Sand",
    subCategory: [
      { label: "River Sand", value: "River Sand" },
      { label: "Pit Sand", value: "Pit Sand" },
      { label: "M-Sand", value: "M-Sand" },
    ],
  },
  {
    id: 6,
    label: "Gravel",
    value: "Gravel",
    subCategory: [
      { label: "Pea Gravel", value: "Pea Gravel" },
      { label: "Crushed Stone", value: "Crushed Stone" },
      { label: "Bank Gravel", value: "Bank Gravel" },
    ],
  },
  {
    id: 7,
    label: "Glass",
    value: "Glass",
    subCategory: [
      { label: "Float Glass", value: "Float Glass" },
      { label: "Tempered Glass", value: "Tempered Glass" },
      { label: "Laminated Glass", value: "Laminated Glass" },
    ],
  },
  {
    id: 8,
    label: "Wood",
    value: "Wood",
    subCategory: [
      { label: "Softwood", value: "Softwood" },
      { label: "Hardwood", value: "Hardwood" },
      { label: "Plywood", value: "Plywood" },
    ],
  },
  {
    id: 9,
    label: "Tiles",
    value: "Tiles",
    subCategory: [
      { label: "Ceramic Tiles", value: "Ceramic Tiles" },
      { label: "Porcelain Tiles", value: "Porcelain Tiles" },
      { label: "Vinyl Tiles", value: "Vinyl Tiles" },
    ],
  },
  {
    id: 10,
    label: "Insulation",
    value: "Insulation",
    subCategory: [
      { label: "Fiberglass Insulation", value: "Fiberglass Insulation" },
      { label: "Foam Board Insulation", value: "Foam Board Insulation" },
      { label: "Spray Foam Insulation", value: "Spray Foam Insulation" },
    ],
  },
  {
    id: 11,
    label: "Plasterboard",
    value: "Plasterboard",
    subCategory: [
      {
        label: "Moisture-Resistant Plasterboard",
        value: "Moisture-Resistant Plasterboard",
      },
      {
        label: "Fire-Resistant Plasterboard",
        value: "Fire-Resistant Plasterboard",
      },
      { label: "Acoustic Plasterboard", value: "Acoustic Plasterboard" },
    ],
  },
  {
    id: 12,
    label: "Paint",
    value: "Paint",
    subCategory: [
      { label: "Oil-Based Paint", value: "Oil-Based Paint" },
      { label: "Water-Based Paint", value: "Water-Based Paint" },
      { label: "Acrylic Paint", value: "Acrylic Paint" },
    ],
  },
];
