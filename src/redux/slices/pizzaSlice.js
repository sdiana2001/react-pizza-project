import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// First, create the thunk
export const fetchPizzas = createAsyncThunk(
  'pizza/fetchPizzaStatus',
  async ({ categoryQuery, sortQuery, searchProperty }) => {
    const queryString = [categoryQuery, sortQuery, searchProperty].filter(Boolean).join('&');
    const { data } = await axios.get(
      `https://66a904f6e40d3aa6ff5a4dc3.mockapi.io/item?${queryString}`,
    );

    return data;
  },
);


const initialState = {
  pizzaItems: [],
  status: 'loading', // 'loading' | 'success' | 'error'
};

export const pizzaSlice = createSlice({
  name: 'pizza',
  initialState: initialState,
  reducers: {
    setPizzaItem(state, action) {
      state.pizzaItems = action.payload;
    },
  },
  extraReducers: (builder)=>{
    builder
      .addCase(fetchPizzas.pending, (state) => {
        state.status = 'loading';
        state.pizzaItems = [];
      })
      .addCase(fetchPizzas.fulfilled, (state, action) => {
        state.pizzaItems = action.payload;
        state.status = 'succes';
      })
      .addCase(fetchPizzas.rejected, (state)=>{
        state.status = 'error';
        state.pizzaItems = [];
      });
  },
});

export const { setPizzaItem } = pizzaSlice.actions;
export default pizzaSlice.reducer;

// cartSlice - хранит глобальное состояние корзины.
