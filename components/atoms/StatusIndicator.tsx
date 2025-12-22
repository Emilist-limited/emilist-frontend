interface StatusIndicatorProps {
  isOnline: boolean;
}

const StatusIndicator = ({ isOnline }: StatusIndicatorProps) => (
  <div className="flex items-center gap-2">
    <span
      className={`w-2 h-2 rounded-full ${
        isOnline ? "bg-primary-green" : "bg-gray-400"
      }`}
      aria-hidden="true"
    ></span>
    <span
      className={`text-sm ${isOnline ? "text-primary-green" : "text-gray-400"}`}
    >
      {isOnline ? "Online" : "Offline"}
    </span>
  </div>
);

export default StatusIndicator;
