import { createSlice, PayloadAction } from '@reduxjs/toolkit';


export interface IFilterSliceState {
  categoryId:number,
  sortId: number,
  pageCount: number,
}

const initialState: IFilterSliceState = {
  categoryId: 0,
  sortId: 0,
  pageCount: 1,
};

export const filter = createSlice({
  name: 'filter',
  initialState: initialState,

  reducers: {
    setCategoryId(state, action: PayloadAction<number>) {
      state.categoryId = action.payload;
    },
    setSortId(state, action: PayloadAction<number>) {
      state.sortId = action.payload;
    },
    setPageCount(state, action: PayloadAction<number>) {
      state.pageCount = action.payload;
    },
    setFilters(state, action: PayloadAction<IFilterSliceState>) {
      state.sortId = Number(action.payload.sortId); // оборачиваем в Number() чтобы присвоить актуальную инфу(из запросной строки) в initialState
      state.pageCount = Number(action.payload.pageCount);
      state.categoryId = Number(action.payload.categoryId);
    },
  },
});

export const { setCategoryId, setSortId, setPageCount, setFilters } = filter.actions;
export default filter.reducer;

// filterSlice - хранит глобальное состояние фильтров (categoryId, sortId).
