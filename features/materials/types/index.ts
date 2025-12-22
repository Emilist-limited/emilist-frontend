export interface ProductImage {
  imageUrl?: string;
  _id?: string;
}

export interface Product {
  clicks: {
    users?: string[];
    clickCount?: number;
  };
  _id: string;
  name: string;
  category: string;
  subCategory: string;
  brand: string;
  description: string;
  images: ProductImage[];
  availableQuantity: number;
  price: number;
  storeName: string;
  location: string;
  currency: string;
  averageRating?: number;
  totalReviews?: number;
  discountedPrice?: number;
  userId?: {
    _id: string;
    email: string;
    userName: string;
    uniqueId: string;
    fullName: string;
    profileImage?: string;
    level: string;
  };
  isDiscounted: boolean;
  reviews: string[];
  createdAt: Date;
}

export interface NewProductType {
  name: string;
  category: string;
  subCategory: string;
  brand: string;
  description: string;
  availableQuantity: string;
  price: string;
  storeName: string;
  location: string;
  currency: string;
}

export interface Material {
  product: Product;
  liked: boolean;
  isCompared: boolean;
  averageRating: number;
  numberOfRatings: number;
  reviewsData: string[];
}
