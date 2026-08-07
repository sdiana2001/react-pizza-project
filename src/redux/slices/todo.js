import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: [],
};

export const toDoSlice = createSlice({
  name: 'todo',
  initialState: initialState,
  reducers: { //это список функций-инструкций.
    addTask: (state, action) => {
      // Каждая функция отвечает за одно конкретное действие над данными.
      state.value.push(action.payload);
    },
  },
});

export const { addTask } = toDoSlice.actions; // тут экспортируем все actions (функции)

export default toDoSlice.reducer;




// Переменная action ЗДЕСЬ — это и есть наш объект-посылка:
// action = { type: 'todo/addTask', payload: 'Купить хлеб' }
// action.payload- это (объект-посылка) новая задача которую мы добавили в текущем времени(сейчас)
// state.value - это весь список задач, который накопился к этому моменту. Поэтому в начале от туда приходит пустой массив


// Компонент: рисует интерфейс и вызывает dispatch().

// createAsyncThunk: делает сетевой запрос.

// extraReducers: обновляет стейт на основе ответа.