/* React-specific entry point that automatically generates
   hooks corresponding to the defined endpoints */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/" }),
  endpoints: (builder) => ({
    getTodos: builder.query({
      query: (priority) => {
        const params = new URLSearchParams();
        if (priority) {
          params.append("priority", priority);
        }
        return {
          url: "tasks",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["todo"],
    }),
    addTodo: builder.mutation({
      query: (data) => {
        return {
          url: "task",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["todo"],
    }),

    deleteTodo: builder.mutation({
      query: (id) => {
        return {
          url: `task/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["todo"],
    }),

    updateTodo: builder.mutation({
      query: (data) => {
        return {
          url: `task/${data.id}`,
          method: "PUT",
          body: data,
        };
      },
      invalidatesTags: ["todo"],
    }),
  }),
});

export const {
  useGetTodosQuery,
  useDeleteTodoMutation,
  useUpdateTodoMutation,
  useAddTodoMutation,
} = baseApi;
