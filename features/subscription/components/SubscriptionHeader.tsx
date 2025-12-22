import DashboardNavToggle from "@/components/molecules/DashboardNavToggle";

import { subscriptionLinks } from "../constants";

const SubscriptionHeader = () => {
  return (
    <div className="space-y-4 pb-10">
      <h2 className="text-xl font-bold max-sm:text-lg">Subscriptions</h2>
      <DashboardNavToggle links={subscriptionLinks} />
    </div>
  );
};

export default SubscriptionHeader;
