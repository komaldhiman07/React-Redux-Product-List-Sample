import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: [],
  reducers: {
    addCart(state: any, action: { type: any; payload: any }) {
      const productIndex = state.findIndex(
        (item: any) => item.id === action.payload.id
      );
      if (productIndex !== -1) {
        state[productIndex].count = state[productIndex].count
          ? state[productIndex].count + 1
          : 1;
      } else {
        state.push({ ...action.payload, count: 1 });
      }
      return state;
    },
    decreaseCount(state: any, action: { type: any; payload: any }) {
      const productIndex = state.findIndex(
        (item: any) => item.id === action.payload.id
      );
      if (action.payload.count > 1) {
        state[productIndex].count = state[productIndex].count
          ? state[productIndex].count - 1
          : 1;
        console.log("if condition");
      } else {
        return state.filter((item: any) => action.payload.id !== item.id);
      }
    },
    removeCart(state, action) {
      return state.filter((item: any) => item.id !== action.payload);
    },
  },
});
export const { addCart, removeCart, decreaseCount } = cartSlice.actions;
export default cartSlice.reducer;
