import { configureStore } from "@reduxjs/toolkit";
import { brandsApi } from "./api/api.brands";
import { categoriesApi } from "./api/api.categories";
import { productsApi } from "./api/api.products";

export const store = configureStore({
  reducer: {
    [productsApi.reducerPath]: productsApi.reducer,
    [categoriesApi.reducerPath]: categoriesApi.reducer,
    [brandsApi.reducerPath]: brandsApi.reducer,
  },
  //   middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(Logger),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      productsApi.middleware,
      categoriesApi.middleware,
      brandsApi.middleware
    ),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
