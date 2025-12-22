export interface Perk {
  _id: string;
  name: string;
  limit: number;
  used: number;
}

export interface Offer {
  _id: string;
  name: string;
  value: string;
  isActive: boolean;
}

export interface Plan {
  _id: string;
  name: string;
  price: number;
  duration: number;
  perks: Perk[];
  isActive: boolean;
  offers: Offer[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface UserSubscription {
  _id: string;
  userId: string;
  planId: Plan;
  status: string;
  startDate: Date;
  endDate: Date;
  perks: Perk[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface SubscriptionPaymentModalProps {
  isOpen: boolean;
  onCancel: () => void;
  amount: number;
  currency: string;
  setCurrency: (currency: string) => void;
  paymentMethod: string;
  setPaymentMethod: (paymentMethod: string) => void;
  handleSubNewPlan: (e: React.FormEvent) => void;
  planId: string;
  loading: boolean;
}
