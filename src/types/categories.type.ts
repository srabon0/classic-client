interface SubCategory {
  isDeleted: boolean;

  name: string;
  isDelete: boolean;
  id: string;
}

interface Category {
  name: string;
  description: string;
  subCategories?: SubCategory[]; // subCategories is optional
  isDeleted: boolean;
  id: string;
}

export type TCategory = Category;
export type TSubCategory = SubCategory;
export type TCategoryResponse = Category[];