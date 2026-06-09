// Tipe data inti untuk VELISCA
export type Category = "fashion" | "skincare";

export interface Product {
  id: string;
  name: string;
  slug: string;
  category: Category;
  subcategory: string;
  price: number;
  originalPrice?: number;
  images: string[];
  description: string;
  ingredients?: string;
  material?: string;
  rating: number;
  reviewCount: number;
  stock: number;
  badge?: "Baru" | "Terlaris" | "Sale";
  isNew?: boolean;
  isBestSeller?: boolean;
  isOnSale?: boolean;
  variants?: { label: string; options: string[] }[];
}

export interface CartItem {
  productId: string;
  name: string;
  slug: string;
  price: number;
  image: string;
  quantity: number;
  variant?: string;
}

export interface WishlistItem {
  productId: string;
  name: string;
  slug: string;
  price: number;
  image: string;
}

export interface Review {
  id: string;
  productId: string;
  author: string;
  rating: number;
  date: string;
  comment: string;
}

export type OrderStatus = "Diproses" | "Dikirim" | "Selesai";

export interface Order {
  id: string;
  date: string;
  status: OrderStatus;
  items: CartItem[];
  total: number;
  shipping: {
    name: string;
    address: string;
    city: string;
    postalCode: string;
    phone: string;
  };
}
