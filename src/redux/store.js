import { configureStore } from '@reduxjs/toolkit';
import filter  from './slices/filterSlice.js';
import cart from './slices/cartSlice.js';
import pizza from './slices/pizzaSlice.js';



export const store = configureStore({
  // reducer- это список функций-инструкций. Каждая функция отвечает за одно конкретное действие над данными.
  reducer: {
    filter,
    cart,
    pizza
  },
});

// добавление слайсов в хранилище(через редуктор)
