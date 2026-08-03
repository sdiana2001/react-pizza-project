import { configureStore } from '@reduxjs/toolkit';
import filter  from './slices/filterSlice';
import cart from './slices/cartSlice';



export const store = configureStore({
  // reducer- это список функций-инструкций. Каждая функция отвечает за одно конкретное действие над данными.
  reducer: {
    filter,
    cart
  },
});

// добавление слайсов в хранилище(через редуктор)
