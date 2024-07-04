interface SubCategory {
  _id: string;
  name: string;
  isDeleted: boolean;
  id: string;
}

interface Category {
  _id: string;
  name: string;
  description: string;
  subCategories: SubCategory[];
  isDeleted: boolean;
  id: string;
}

interface Brand {
  _id: string;
  name: string;
  description: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface Product {
  _id: string;
  sl_no: number;
  category: Category;
  subCategory: string;
  code: string;
  codeOld: string | null;
  title: string;
  unit: string;
  cartoncapacity: number;
  price: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  image: any[]; // Adjust the type as necessary
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  tags: any[]; // Adjust the type as necessary
  status: string;
  model: string;
  description: string;
  brand: Brand;
}

export type TProduct = Product;
export type TProductResponse = Product[];
export type TProductCreate = Product;
