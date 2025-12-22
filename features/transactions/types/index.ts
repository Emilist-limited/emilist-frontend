export interface TransactionUser {
  _id: string;
  email: string;
  userName: string;
  uniqueId: string;
  fullName: string;
  profileImage: string;
  level: string;
}

export interface Transaction {
  _id: string;
  userId: TransactionUser;
  type: "CREDIT" | "DEBIT";
  amount: number;
  description: string;
  balanceBefore: number;
  status: "pending" | "completed" | "failed";
  recieverId: string;
  reference: string;
  paymentMethod: string;
  adminApproval: boolean;
  transferReceipt: string | null;
  walletId: string;
  currency: string;
  isSettled: boolean;
  serviceType: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
