import { createSlice } from "@reduxjs/toolkit";

import { RootState } from "../../store";

interface Brand {
  name: string;
  description: string;
  _id: string;
}

type TBrandState = {
  brands: Brand[];
  loading: boolean;
  error: string;
};

const brandSlice = createSlice({
  name: "brand",
  initialState: {
    brands: [],
    loading: false,
    error: "",
  } as TBrandState,
  reducers: {
    setBrands: (state, action) => {
      state.brands = action.payload;
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

export const { setBrands, setLoading, setError } = brandSlice.actions;

export default brandSlice.reducer;

export const useBrands = (state: RootState) => state.brand.brands;
