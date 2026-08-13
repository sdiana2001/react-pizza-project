import axios from 'axios';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';


export type TPizzaItem = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  type: string;
  size: number;
  rating: number;
};

export type FetchPizzaParams = {
  categoryQuery: string;
  sortQuery: string;
  searchProperty: string;
};


export enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

export interface IPizzaSliceState {
  pizzaItems: TPizzaItem[];
  status: Status; // 'loading' | 'success' | 'error'
}


const initialState: IPizzaSliceState = {
  pizzaItems: [],
  status: Status.LOADING, // 'loading' | 'success' | 'error'
};


// First, create the thunk
export const fetchPizzas = createAsyncThunk<TPizzaItem[], FetchPizzaParams, { rejectValue: string }>(
  'pizza/fetchPizzaStatus',
  async ({ categoryQuery, sortQuery, searchProperty }, thunkAPI) => {
    try {
      const queryString = [categoryQuery, sortQuery, searchProperty].filter(Boolean).join('&');

      const { data } = await axios.get<TPizzaItem[]>(
        `https://66a904f6e40d3aa6ff5a4dc3.mockapi.io/item?${queryString}`,
        { signal: thunkAPI.signal }, // signal в Axios избавляет приложение от лишней нагрузки и «гонки запросов» (race conditions).
      );

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue('Не удалось загрузить пиццы');
    }
  },
);







export const pizzaSlice = createSlice({
  name: 'pizza',
  initialState: initialState,
  reducers: {
    setPizzaItem(state, action: PayloadAction<TPizzaItem[]>) {
      state.pizzaItems = action.payload;
    },
  },
  extraReducers: (builder)=>{
    builder
      .addCase(fetchPizzas.pending, (state) => {
        state.status = Status.LOADING;
        state.pizzaItems = [];
      })
      .addCase(fetchPizzas.fulfilled, (state, action) => {
        state.pizzaItems = action.payload;
        state.status = Status.SUCCESS;
      })
      .addCase(fetchPizzas.rejected, (state)=>{
        state.status = Status.ERROR;
        state.pizzaItems = [];
      });
  },
});

export const { setPizzaItem } = pizzaSlice.actions;
export default pizzaSlice.reducer;

// cartSlice - хранит глобальное состояние корзины.
