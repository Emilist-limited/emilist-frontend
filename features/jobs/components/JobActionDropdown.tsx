import ActionMenuDropdownButton from "@/components/atoms/ActionMenuDropdownButton";

interface JobActionDropdownProps {
  onDelete: () => void;
  href: string;
}

const JobActionDropdown = ({ onDelete, href }: JobActionDropdownProps) => {
  return (
    <>
      <ActionMenuDropdownButton title="Edit" href={href} />
      <ActionMenuDropdownButton
        title="Delete"
        onClick={onDelete}
        className="max-sm:text-sm text-red-500 hover:text-red-700 whitespace-nowrap transition-all duration-300"
      />
    </>
  );
};

export default JobActionDropdown;
