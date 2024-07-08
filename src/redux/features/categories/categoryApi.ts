import { baseApi } from "../../api/baseApi";
import { tagTypes } from "../../tag-types";

const CAT_URL = "categories";
const categoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query({
      query: (arg: Record<string, any>) => {
        return {
          url: CAT_URL,
          method: "GET",
          params: arg,
        };
      },
      providesTags: [tagTypes.categories],
    }),
    addCategory: builder.mutation({
      query: (data) => ({
        url: "categories",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [tagTypes.categories],
    }),
    deleteCategory: builder.mutation({
      query: (id) => ({
        url: `categories/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.categories],
    }),
    updateCategory: builder.mutation({
      query: (data) => ({
        url: `categories/${data.id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: [tagTypes.categories],
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useAddCategoryMutation,
  useDeleteCategoryMutation,
  useUpdateCategoryMutation,
} = categoryApi;
