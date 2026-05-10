import { Product } from './product';

export interface CartItem {
  id: number;
  userId: number;
  Product: Product[];
}
