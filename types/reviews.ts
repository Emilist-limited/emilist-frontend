export interface ReviewUserInfo {
  fullName?: string;
  userName: string;
  profileImage: string;
}

export interface Review {
  userId: ReviewUserInfo;
  rating: number;
  comment: string;
}
