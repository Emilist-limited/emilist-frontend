import { formatCreatedAt } from "@/lib/helpers/formatCreatedAt";
import { Notification } from "@/types/notification";

const NotificationItem = ({
  notification,
  onClear,
}: {
  notification: Notification;
  onClear: (id: string) => void;
}) => (
  <div className="flex gap-2 border-b-1 border-[#CBD5E1] px-6 max-md:px-3 py-3">
    <div className="flex-1">
      <div className="flex-c-b w-full mb-2">
        <h6 className="font-bold max-sm:text-sm truncate">
          {notification.title}
        </h6>
        <p className="text-[#737774] text-xs max-sm:text-[8px]">
          {formatCreatedAt(notification.createdAt)}
        </p>
      </div>
      <p className="text-[#737774] text-sm max-sm:text-xs">
        {notification.message}
      </p>
      <div className="flex justify-end">
        <button
          className="text-sm text-primary-green font-medium uppercase"
          onClick={() => onClear(notification._id)}
        >
          CLEAR
        </button>
      </div>
    </div>
  </div>
);

export default NotificationItem;
