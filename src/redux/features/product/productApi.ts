import { baseApi } from "../../api/baseApi";
import { tagTypes } from "../../tag-types";

const PRODUCT_URL = "products";

const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: (arg: Record<string, any>) => {
        return {
          url: PRODUCT_URL,
          method: "GET",
          params: arg,
        };
      },
      providesTags: [tagTypes.products],
    }),
    addProduct: builder.mutation({
      query: (data) => ({
        url: PRODUCT_URL + "/create-product",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [tagTypes.products],
    }),
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `products/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.products],
    }),
    updateProduct: builder.mutation({
      query: (data) => ({
        url: `products/${data?.id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: [tagTypes.products],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useAddProductMutation,
  useDeleteProductMutation,
  useUpdateProductMutation,
} = productApi;
