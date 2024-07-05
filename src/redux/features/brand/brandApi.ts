import { baseApi } from "../../api/baseApi";

const brandAPi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getBrands: builder.query({
      query: () => ({
        url: "brands",
        method: "GET",
      }),
      //   providesTags: ["Brand"],
    }),
    addBrand: builder.mutation({
      query: (data) => ({
        url: "brands",
        method: "POST",
        body: data,
      }),
      //   invalidatesTags: ["Brand"],
    }),
    deleteBrand: builder.mutation({
      query: (id) => ({
        url: `brands/${id}`,
        method: "DELETE",
      }),
      //   invalidatesTags: ["Brand"],
    }),
    updateBrand: builder.mutation({
      query: (data) => ({
        url: `brands/${data.id}`,
        method: "PUT",
        body: data,
      }),
      //   invalidatesTags: ["Brand"],
    }),
  }),
});

export const {
  useGetBrandsQuery,
  useAddBrandMutation,
  useDeleteBrandMutation,
  useUpdateBrandMutation,
} = brandAPi;
