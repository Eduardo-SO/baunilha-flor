export type Product = {
  id: string;
  title: string;
  shortDescription: string;
  description: string;
  price: number | string;
  imageUrl: string;
  category: string;
  createdAt: Date | string;
  updatedAt: Date | string;
};