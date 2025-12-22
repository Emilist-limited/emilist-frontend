export const getStatusClass = (status: string) => {
  const normalizedStatus = status?.trim()?.toLowerCase();
  switch (normalizedStatus) {
    case "pending":
      return "text-yellow-400 bg-yellow-100";
    case "accepted":
      return "text-green-400 bg-green-100";
    case "rejected":
      return "text-red-400 bg-red-100";
    case "processing":
      return "text-blue-400 bg-blue-100";
    case "active":
      return "text-green-400 bg-green-100";
    case "paused":
      return "text-yellow-400 bg-yellow-100";
    case "completed":
      return "text-green-400 bg-green-100";
    case "overdue":
      return "text-[#FF5D7A] bg-[#FFF1F2]";
    default:
      return "";
  }
};
