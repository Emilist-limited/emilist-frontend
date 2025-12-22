export interface CartProductImage {
  imageUrl: string;
}

export interface CartProduct {
  images: CartProductImage[];
  name: string;
  _id: string;
  currency: string;
}

export interface CartProductItems {
  productId: CartProduct;
  quantity: number;
  price: number;
}

export interface CartItem {
  products: CartProductItems[];
  totalAmount: number;
}

export interface CartTableProps {
  cartItems: CartItem;
  deleteMaterialFromCart: (id: string) => Promise<void>;
  decreaseCartQuantity: (id: string) => Promise<void>;
  incrementCartQuantity: (id: string) => Promise<void>;
  vat?: number;
}
