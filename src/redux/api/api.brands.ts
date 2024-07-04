import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const brandsApi = createApi({
  reducerPath: "brandsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000/api/v1/",
  }),
  endpoints: (builder) => ({
    getBrands: builder.query({
      query: () => ({
        url: "brands",
        method: "GET",
      }),
      providesTags: ["Brand"],
    }),
    addBrand: builder.mutation({
      query: (data) => ({
        url: "brands",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Brand"],
    }),
    deleteBrand: builder.mutation({
      query: (id) => ({
        url: `brands/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Brand"],
    }),
    updateBrand: builder.mutation({
      query: (data) => ({
        url: `brands/${data.id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Brand"],
    }),
  }),
});

export const {
  useGetBrandsQuery,
  useAddBrandMutation,
  useDeleteBrandMutation,
  useUpdateBrandMutation,
} = brandsApi;
