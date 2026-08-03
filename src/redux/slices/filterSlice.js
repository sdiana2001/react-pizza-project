import { createSlice } from "@reduxjs/toolkit"
//Redux — это «Единый источник правды»

const initialState ={
    categoryId: 0,
    sort: 0,
    pageCount: 1
}

export const filter = createSlice({
  name: 'filter',
  initialState: initialState,
  reducers: {
    setCategoryId(state, action) {
      state.categoryId = action.payload;
    },
    setSortId(state, action) {
      state.sort = action.payload;
    },
    setPageCount(state, action) {
      state.pageCount = action.payload;
    },
    setFilters(state, action) {
      state.sort = Number(action.payload.sortId); // оборачиваем в Number() чтобы присвоить актуальную инфу(из запросной строки) в initialState
      state.pageCount = Number(action.payload.pageCount);
      state.categoryId = Number(action.payload.categoryId);
    },
  },
});

export const { setCategoryId, setSortId, setPageCount, setFilters } = filter.actions;
export default filter.reducer;

// filterSlice - хранит глобальное состояние фильтров (categoryId, sortId).
