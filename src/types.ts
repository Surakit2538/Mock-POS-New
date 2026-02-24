export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  description: string;
  calory: string;
  deliveryCost: string;
  deliveryTime: string;
}

export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
  size: 'S' | 'M' | 'L';
  orderedBy?: 'staff' | 'customer';
  status?: 'pending' | 'cooking' | 'served';
}

export interface Table {
  id: string;
  name: string;
  status: 'free' | 'reserved' | 'checked-in';
  detail: string;
  seats: number;
  items: { product: Product, qty: number, orderedBy?: 'staff' | 'customer', status?: 'pending' | 'cooking' | 'served' }[];
}
