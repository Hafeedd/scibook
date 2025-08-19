import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./apiSlice";
import productsSlice from "./features/products/productsSlice";
import inventorySlice from "./features/Inventory/inventorySlice";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,

    product: productsSlice,
    inventory: inventorySlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export default store;
