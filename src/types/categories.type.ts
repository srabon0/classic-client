interface SubCategory {
  isDeleted: boolean;
  _id: string;
  name: string;
  isDelete: boolean;
  id: string;
}

interface Category {
  _id: string;
  name: string;
  description: string;
  subCategories?: SubCategory[]; // subCategories is optional
  isDeleted: boolean;
  id: string;
}

export type TCategory = Category;
export type TSubCategory = SubCategory;
