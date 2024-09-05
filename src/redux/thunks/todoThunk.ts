import { createAsyncThunk } from '@reduxjs/toolkit'
import getNextStatus from '../../services/getNextStatus'
import supabase from '../../lib/supabaseClient'
import { Todo, TodoList } from '../../types/todos'

/**
 * Fetch all lists from supabase.
 */
export const fetchLists = createAsyncThunk(
  'todos/fetchLists',
  async () => {
    const { data, error } = await supabase.from( 'lists' ).select( '*' )

    if ( error ) {
      throw new Error( error.message )
    }

    return data as TodoList[]
  },
)

/**
 * Adds a new list to supabase.
 */
export const addList = createAsyncThunk(
  'todos/addList',
  async ( newList: TodoList ) => {
    const { error } = await supabase.from( 'lists' ).insert( newList )

    if ( error ) {
      throw new Error( error.message )
    }

    return newList
  },
)

/**
 * Remove a list in supabase.
 */
export const removeList = createAsyncThunk(
  'todos/removeList',
  async ( listId: string ) => {
  // First, murder the lose todos associate with alist.
    const { error: todoError } = await supabase.from( 'todos' ).delete().eq( 'list_id', listId )

    if ( todoError ) {
      throw new Error( todoError.message )
    }

    // Next, murder the list.
    const { error } = await supabase.from( 'lists' ).delete().eq( 'id', listId )

    if ( error ) {
      throw new Error( error.message )
    }

    return listId
  },
)

/**
 * Fetch todo items for a given list from supabase.
 */
export const fetchTodosByListId = createAsyncThunk(
  'todos/fetchTodosByListId',
  async ( listId: string ) => {
    const { data, error } = await supabase
      .from( 'todos' )
      .select( '*' )
      .eq( 'list_id', listId )

    if ( error ) {
      throw new Error( error.message )
    }

    return { listId, todos: data as Todo[] }
  },
)

/**
 * Add a todo item to supabase, assocated with a list.
 */
export const addTodo = createAsyncThunk(
  'todos/addTodo',
  async ( params: {
    listId: string;
    todo: Omit<Todo, 'created_at' | 'order'>
  } ) => {
    const newTodo = {
      ...params.todo,
      list_id: params.listId,
    }

    const { error: insertError } = await supabase.from( 'todos' ).insert( newTodo )

    if ( insertError ) {
      throw new Error( insertError.message )
    }

    // Fetch updated list of todos after we update.
    // Helps to avoid a state delay.
    // @todo: this shouldn't be necessary, check into state handling
    // in the ListScreen.tsx.
    const { data, error } = await supabase
      .from( 'todos' )
      .select( '*' )
      .eq( 'list_id', params.listId )

    if ( error ) {
      throw new Error( error.message )
    }

    return { listId: params.listId, todos: data as Todo[] }
  },
)

/**
 * Remove a todo from supabase.
 */
export const removeTodo = createAsyncThunk(
  'todos/removeTodo',
  async ( params: { listId: string; todoId: string } ) => {
    const { error } = await supabase.from( 'todos' )
      .delete().eq( 'id', params.todoId )

    if ( error ) {
      throw new Error( error.message )
    }

    return params
  },
)

/**
 * Toggle the status, incomplete, partially-complete, or complete.
 */
export const toggleTodoStatus = createAsyncThunk(
  'todos/toggleTodoStatus',
  async ( params: { listId: string; todoId: string } ) => {
    const { data, error } = await supabase.from( 'todos' )
      .select( 'status' ).eq( 'id', params.todoId ).single()

    if ( error ) {
      throw new Error( error.message )
    }

    const newStatus = getNextStatus( data.status )

    const { error: updateError } = await supabase.from( 'todos' )
      .update( { status: newStatus } ).eq( 'id', params.todoId )

    if ( updateError ) {
      throw new Error( updateError.message )
    }

    return { ...params, status: newStatus }
  },
)
