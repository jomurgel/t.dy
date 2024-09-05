import { configureStore } from '@reduxjs/toolkit'
import todosReducer from './slices/todo'

const store = configureStore( {
  reducer: {
    todos: todosReducer,
  },
} )

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
