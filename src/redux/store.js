import { configureStore } from '@reduxjs/toolkit';
import  counterSlice from './slices/counterSlice';


export const store = configureStore({
  reducer: {
   counter: counterSlice,
  },
});


// добавление слайсов в хранилище(через редуктор)
