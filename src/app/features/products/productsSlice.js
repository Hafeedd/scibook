import { createSlice } from "@reduxjs/toolkit";

export const productsSlice = createSlice({
  name: "products",
  initialState: [],
  reducers: {
    addProduct(state, action) {
      state.push(action.payload);
    },
    removeProduct(state, action) {
      return state.filter((product) => product.id !== action.payload.id);
    },
    updateProduct(state, action) {
      const index = state.findIndex(
        (product) => product.id === action.payload.id
      );
      if (index !== -1) {
        state[index] = action.payload;
      }
    },
  },
});

export const { addProduct, removeProduct, updateProduct } =
  productsSlice.actions;
  
export default productsSlice.reducer;
