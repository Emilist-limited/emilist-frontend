import { Notification } from "@/types/notification";

import NotificationItem from "../atoms/NotificationItem";

const NotificationGroup = ({
  dateKey,
  notifications,
  onClear,
}: {
  dateKey: string;
  notifications: Notification[];
  onClear: (id: string) => void;
}) => (
  <div className="flex flex-col">
    <div className="flex-c-b px-6 max-md:px-3 bg-[#F2F4F7] py-2 border-b-1 border-[#DEE5ED]">
      <h6 className="text-xs font-medium">{dateKey}</h6>
    </div>
    <div className="flex flex-col">
      {notifications.slice(0, 3).map((notification, index) => (
        <NotificationItem
          key={index}
          notification={notification}
          onClear={onClear}
        />
      ))}
    </div>
  </div>
);

export default NotificationGroup;
