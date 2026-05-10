export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

export enum ProductCategory {
  Electronics = 'electronics',
  WomensClothing = 'women\'s clothing',
  MensClothing = 'men\'s clothing',
  AllClothing = 'clothing'
}