import {
  fetchLists, removeList, addList, fetchTodosByListId, addTodo, removeTodo, toggleTodoStatus,
} from '../thunks/todoThunk'

/**
 * Extra reducers for handling local state from Supabase.
 */
const todoReducers = ( builder ) => {
  builder
    // Update the list fetch statuses. Loading, successful, or failure.
    // @todo: refactor the error out of these lines.
    .addCase( fetchLists.pending, ( state ) => {
      // eslint-disable-next-line no-param-reassign
      state.status = 'loading'
    } )
    .addCase( fetchLists.fulfilled, ( state, action ) => {
      // eslint-disable-next-line no-param-reassign
      state.status = 'succeeded'
      // eslint-disable-next-line no-param-reassign
      state.lists = action.payload
    } )
    .addCase( fetchLists.rejected, ( state, action ) => {
      // eslint-disable-next-line no-param-reassign
      state.status = 'failed'
      // eslint-disable-next-line no-param-reassign
      state.error = action.error.message || 'Failed to fetch lists'
    } )

    // Update state when a list is added.
    .addCase( addList.fulfilled, ( state, action ) => {
      state.lists.push( action.payload )
    } )

    // Update state when a list is removed.
    // @todo: refactor the error out of these lines.
    .addCase( removeList.fulfilled, ( state, action ) => {
      // eslint-disable-next-line no-param-reassign
      state.lists = state.lists.filter( ( list ) => list.id !== action.payload )
    } )

    // Update the todo fetch statues. Loading, successful, or failure.
    // @todo: refactor the error out of these lines.
    .addCase( fetchTodosByListId.pending, ( state ) => {
      // eslint-disable-next-line no-param-reassign
      state.status = 'loading'
    } )
    .addCase( fetchTodosByListId.rejected, ( state, action ) => {
      // eslint-disable-next-line no-param-reassign
      state.status = 'failed'
      // eslint-disable-next-line no-param-reassign
      state.error = action.error.message || 'Failed to fetch todos'
    } )
    .addCase( fetchTodosByListId.fulfilled, ( state, action ) => {
      const { listId, todos } = action.payload
      const list = state.lists.find( ( l ) => l.id === listId )

      if ( list ) {
        list.todos = todos
      }

      // eslint-disable-next-line no-param-reassign
      state.status = 'succeeded'
    } )

    // Add todo to list.
    .addCase( addTodo.fulfilled, ( state, action ) => {
      const { listId, todos } = action.payload
      const list = state.lists.find( ( lst ) => lst.id === listId )

      if ( list ) {
        list.todos = todos
      }
    } )

    // Remove todo from list.
    .addCase( removeTodo.fulfilled, ( state, action ) => {
      const list = state.lists.find( ( lst ) => lst.id === action.payload.listId )
      if ( list ) {
        list.todos = list.todos.filter( ( todo ) => todo.id !== action.payload.todoId )
      }
    } )

    // Toggle todo status.
    .addCase( toggleTodoStatus.fulfilled, ( state, action ) => {
      const list = state.lists.find( ( lst ) => lst.id === action.payload.listId )

      if ( list ) {
        const todo = list.todos.find( ( tdo ) => tdo.id === action.payload.todoId )

        if ( todo ) {
          todo.status = action.payload.status
        }
      }
    } )
}

export default todoReducers
