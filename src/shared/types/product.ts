import { ImageData } from './image';

export interface ProductImageData {
  id: number;
  image: ImageData;
}

export interface ProductItem {
  id: number;
  title: string;
  images: ProductImageData[];
  description: string;
  price: number;
  category: string;
  seller_info: string;
  location: string;
  created_date: string;
  status: string;
}
