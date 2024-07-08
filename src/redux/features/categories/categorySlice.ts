import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";

interface ISubcategories {
  name: string;
  _id: string;
}

interface ICategories {
  name: string;
  _id: string;
  subCategories?: ISubcategories[];
}

type TCategoryState = {
  categories: ICategories[];
  loading: boolean;
  error: string;
};

const categorySlice = createSlice({
  name: "category",
  initialState: {
    categories: [],
    loading: false,
    error: "",
  } as TCategoryState,
  reducers: {
    setCategories: (state, action) => {
      state.categories = action.payload;
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

export const { setCategories, setLoading, setError } = categorySlice.actions;

export default categorySlice.reducer;

export const useCategories = (state: RootState) => state.categories.categories;
