import { baseApi } from "../../api/baseApi";
import { tagTypes } from "../../tag-types";
const BRAND_URL = "brands";
const brandAPi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getBrands: builder.query({
      query: (arg: Record<string, any>) => {
        return {
          url: BRAND_URL,
          method: "GET",
          params: arg,
        };
      },
      providesTags: [tagTypes.brands],
    }),

    addBrand: builder.mutation({
      query: (data) => ({
        url: "brands/create-brand",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [tagTypes.brands],
    }),
    deleteBrand: builder.mutation({
      query: (id) => ({
        url: `brands/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.brands],
    }),
    updateBrand: builder.mutation({
      query: (data) => ({
        url: `brands/${data.id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: [tagTypes.brands],
    }),
  }),
});

export const {
  useGetBrandsQuery,
  useAddBrandMutation,
  useDeleteBrandMutation,
  useUpdateBrandMutation,
} = brandAPi;
