/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";

interface IProduct {
  _id: string;
  sl_no: number;
  category: string;
  subCategory: string;
  code: number;
  codeOld?: number | null;
  title: string;
  unit: string;
  cartoncapacity: number;
  price: number;
  image: any[];
  tags: string[];
  status: string;
  model: string;
  description: string;
  brand: string;
}

type TProductState = {
  products: IProduct[];
  loading: boolean;
  error: string;
};

const productSlice = createSlice({
  name: "product",
  initialState: {
    products: [],
    loading: false,
    error: "",
  } as TProductState,
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
      state.loading = false;
    },
    setLoading: (state) => {
      state.loading = true;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { setProducts, setLoading, setError } = productSlice.actions;

export default productSlice.reducer;

export const useProducts = (state: RootState) => state.products.products;
