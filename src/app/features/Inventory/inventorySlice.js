import { createSlice } from "@reduxjs/toolkit";

const INITIAL_INVENTORY = {
  id: null,
  productId: undefined,
  unit: undefined,
  price: undefined,
  stock: undefined,
  cost: undefined,
  batch: undefined,
  dateOfPurchase: undefined,
  dateOfExpiry: undefined,
  description: undefined,
};

export const inventorySlice = createSlice({
  name: "inventory",
  initialState: INITIAL_INVENTORY,
  reducers: {
    addInventoryItem(state, action) {
      state = action.payload;
    },
    clearInventoryItem(state) {
      state = INITIAL_INVENTORY;
      return state;
    },
    updateInventoryItem(state, action) {
      state = {
        ...state,
        ...action.payload,
      };
      return state;
    },
  },
});

export const { addInventoryItem, clearInventoryItem, updateInventoryItem } =
  inventorySlice.actions;

export default inventorySlice.reducer;
