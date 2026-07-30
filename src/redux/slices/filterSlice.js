import { createSlice } from "@reduxjs/toolkit"


const initialState ={
    categoryId: 0,
    sort: 0
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
        }
    }
})

export const { setCategoryId, setSortId } = filterSlice.actions;
export default filterSlice.reducer;