import { configureStore } from '@reduxjs/toolkit';
import filter  from './slices/filterSlice';
import cart from './slices/cartSlice';
import pizza from './slices/pizzaSlice';



export const store = configureStore({
  // reducer- это список функций-инструкций. Каждая функция отвечает за одно конкретное действие над данными.
  reducer: {
    filter,
    cart,
    pizza
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;



// добавление слайсов в хранилище(через редуктор)
