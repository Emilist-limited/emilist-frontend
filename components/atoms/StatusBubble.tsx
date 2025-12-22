import { getStatusClass } from "@/lib/helpers/getStatusClass";

interface StatusBubbleProps {
  status: string;
  title?: string;
}

const StatusBubble = ({ status, title }: StatusBubbleProps) => {
  return (
    <span
      className={`px-4 py-1 rounded-full w-fit text-xs ${getStatusClass(
        status
      )} `}
    >
      {title || status}
    </span>
  );
};

export default StatusBubble;
