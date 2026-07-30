import { configureStore } from '@reduxjs/toolkit';
import filterSlice  from './slices/filterSlice';



export const store = configureStore({
  // reducer- это список функций-инструкций. Каждая функция отвечает за одно конкретное действие над данными.
  reducer: {
    filterSlice
  },
});

// добавление слайсов в хранилище(через редуктор)
