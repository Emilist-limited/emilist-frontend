import DashboardNavbar from "@/components/organisms/DashboardNavbar";
import MessageWrapper from "@/features/messages/component/MessageWrapper";

const MessagePage = () => {
  return (
    <div className="relative">
      <DashboardNavbar />
      <MessageWrapper />
    </div>
  );
};

export default MessagePage;
