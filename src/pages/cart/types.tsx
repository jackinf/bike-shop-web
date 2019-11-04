/*
  API request-response types
 */

export interface BackendCartItemResponse {
  items: BackendCartItem[];
  total_sum: number;
}

export interface BackendCartItem {
  bike_id: string;
  title: string;
  image: string;
  selling_price: number;
}

/*
  Types for frontend
 */

export interface CartItemResponse {
  items: CartItemType[];
  totalSum: number;
}

export interface CartItemType {
  bikeId: string;
  title: string;
  image: string;
  sellingPrice: number;
}

export interface CartItemProps {
  cartItem: CartItemType;
  onRemoveFromCart: (bikeId: string) => void;
}
