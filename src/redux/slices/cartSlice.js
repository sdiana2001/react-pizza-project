import { createSlice } from '@reduxjs/toolkit';
//Redux — это «Единый источник правды»

const initialState = {
  totalPrice: 0,
  items: [],
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState: initialState,
  reducers: {
    addItem(state, action) {
      const findItem = state.items.find((obj) => obj.id === action.payload.id);

      if (findItem) {
        findItem.count++; // Если такая пицца уже есть — просто увеличиваем счетчик
      } else {
        state.items.push({ ...action.payload, count: 1 }); // Если нет — добавляем с count: 1
      }

      // Считаем общую стоимость всех товаров в корзине
      state.totalPrice = state.items.reduce((sum, obj) => {
        return obj.price * obj.count + sum;
      }, 0);
    },

    removeItem(state, action) {
      state.items = state.items.filter((obj) => obj.id !== action.payload);
    },

    clearItem(state) {
      state.items = [];
    },
  },
});

export const { addItem, removeItem, clearItem } = cartSlice.actions;
export default cartSlice.reducer;

// cartSlice - хранит глобальное состояние корзины.
