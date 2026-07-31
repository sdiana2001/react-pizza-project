import { createSlice } from "@reduxjs/toolkit"


const initialState ={
    categoryId: 0,
    sort: 0,
    pageCount: 1
}

export const filterSlice = createSlice({
    name: 'filter',
    initialState: initialState,
    reducers: {
        setCategoryId(state, action){
            state.categoryId = action.payload;
        },
        setSortId(state, action){
            state.sort = action.payload;
        }, 
        setPageCount(state, action){
            state.pageCount = action.payload;
        }
    }
})

export const { setCategoryId, setSortId, setPageCount } = filterSlice.actions;
export default filterSlice.reducer;

// filterSlice - хранит глобальное состояние фильтров (categoryId, sortId).