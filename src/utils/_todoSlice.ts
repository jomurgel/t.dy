// src/features/todos/todosSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Todo {
    id: string;
    text: string;
    completed: boolean;
}

interface TodosState {
    items: Todo[];
}

const initialState: TodosState = {
    items: [],
};

const todosSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        addTodo: (state, action: PayloadAction<string>) => {
            const newTodo: Todo = {
                id: new Date().toISOString(),
                text: action.payload,
                completed: false,
            };
            state.items.push(newTodo);
        },
        toggleTodo: (state, action: PayloadAction<string>) => {
            const todo = state.items.find((item) => item.id === action.payload);
            if (todo) {
                todo.completed = !todo.completed;
            }
        },
        deleteTodo: (state, action: PayloadAction<string>) => {
            state.items = state.items.filter((item) => item.id !== action.payload);
        },
    },
});

export const { addTodo, toggleTodo, deleteTodo } = todosSlice.actions;
export default todosSlice.reducer;
