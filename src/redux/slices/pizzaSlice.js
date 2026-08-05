import { createSlice } from '@reduxjs/toolkit';


const initialState = {
  pizzaItems: [],
};

export const pizzaSlice = createSlice({
  name: 'pizza',
  initialState: initialState,
  reducers: {
    setPizzaItem(state, action) {
      state.pizzaItems = action.payload;
    },
  },
});

export const { setPizzaItem } = pizzaSlice.actions;
export default pizzaSlice.reducer;

// cartSlice - хранит глобальное состояние корзины.
