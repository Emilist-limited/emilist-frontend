export interface participantType {
  _id: string;
  fullName?: string;
  userName: string;
  profileImage?: string;
}

export interface CoversationType {
  chatId: string;
  participants: participantType[];
  lastMessage: {
    content: string;
    createdAt: string;
  };
}
