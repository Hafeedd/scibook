import { createSlice } from "@reduxjs/toolkit";

const INITIAL_PRODUCT = {
  id: null,
  name: undefined,
  brand: undefined,
  productCost: undefined,
  description: undefined,
};

export const productsSlice = createSlice({
  name: "product",
  initialState: INITIAL_PRODUCT,
  reducers: {
    addProduct(state, action) {
      state = action.payload;
    },
    clearProduct(state) {
      state = INITIAL_PRODUCT;
      return state;
    },
    updateProduct(state, action) {
      state = {
        ...state,
        ...action.payload,
      };
      return state;
    },
  },
});

export const { addProduct, clearProduct, updateProduct } =
  productsSlice.actions;

export default productsSlice.reducer;
