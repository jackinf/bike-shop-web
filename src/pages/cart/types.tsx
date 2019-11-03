export interface GetCartItemsResponse {
  bike_id: string;
  title: string;
  image: string;
}

export interface CartItemType {
  bikeId: string;
  title: string;
  image: string;
}

export interface CartItemProps {
  bikeId: string;
  title: string;
  image: string;
  onRemoveFromCart: (bikeId: string) => void;
}
