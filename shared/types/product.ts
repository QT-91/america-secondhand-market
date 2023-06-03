import { ImageData } from './image';

export interface ProductItem {
  id: number;
  title: string;
  images: ImageData[];
  description: string;
  price: number;
  category: string;
  seller_info: string;
  location: string;
  created_date: string;
  status: string;
}
