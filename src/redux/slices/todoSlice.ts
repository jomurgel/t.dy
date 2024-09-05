import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Todo, TodoList } from '../../types/todos'
import todoReducers from '../reducers/todoReducers'

interface TodosState {
  lists: TodoList[];
  todos: Todo[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: TodosState = {
  lists: [],
  todos: [],
  status: 'idle',
  error: null,
}

const todosSlice = createSlice( {
  name: 'todos',
  initialState,
  reducers: {
    // @todo: refactor the error out of this.
    setLists( state, action: PayloadAction<TodoList[]> ) {
      // eslint-disable-next-line no-param-reassign
      state.lists = action.payload
    },
    // @todo: refactor the error out of this.
    setTodos( state, action: PayloadAction<Todo[]> ) {
      // eslint-disable-next-line no-param-reassign
      state.todos = action.payload
    },
  },
  extraReducers: todoReducers,
} )

export const { setLists, setTodos } = todosSlice.actions

export default todosSlice.reducer
