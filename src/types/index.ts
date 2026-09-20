export type Role = "CUSTOMER" | "FARMER" | "DRIVER" | "ADMIN";

export type OrderStatus =
  | "PLACED"
  | "CONFIRMED"
  | "PREPARING"
  | "READY_FOR_PICKUP"
  | "PICKED_UP"
  | "OUT_FOR_DELIVERY"
  | "DELIVERED"
  | "CANCELLED";

export interface Product {
  id: string;
  name: string;
  farmerId: string;
  price: number;
  unit: string;
  description: string;
  imageUrl: string;
  category: string;
  stock: number;
  isOrganic?: boolean;
}

export interface Farmer {
  id: string;
  name: string;
  location: string;
  isVerified: boolean;
  rating: number;
  joinedDate: string;
}

export interface Driver {
  id: string;
  name: string;
  phone: string;
  vehicle: string;
  rating: number;
}

export interface Customer {
  id: string;
  name: string;
  phone: string;
  address: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Order {
  id: string;
  customerId: string;
  farmerId: string;
  driverId?: string;
  items: CartItem[];
  totalAmount: number;
  status: OrderStatus;
  createdAt: string;
  updatedAt: string;
  deliveryAddress: string;
}
