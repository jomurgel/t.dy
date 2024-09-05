import React, { ReactElement, useContext } from 'react'
import {
  View, Text, TextInput, FlatList, StyleSheet,
  ViewStyle,
} from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { RouteProp, useNavigation, useFocusEffect } from '@react-navigation/native'
import { LinearGradient } from 'expo-linear-gradient'
import { SafeAreaView } from 'react-native-safe-area-context'
import Button from '../components/Button'
import { RootStackParamList } from '../types/todos'
import useThemeColors from '../hooks/useThemeColors'
import {
  addTodo, removeList, removeTodo, toggleTodoStatus, fetchTodosByListId,
} from '../redux/thunks/todoThunk'
import { RootState } from '../redux/store'
import themeStyles from '../lib/themeConfig'
import { Theme, ThemeContext } from '../providers/ThemeProvider'

interface Props {
  route: RouteProp<RootStackParamList, 'List'>;
}

function ListScreen( { route }: Props ): ReactElement {
  const navigation = useNavigation()
  const { theme } = useContext( ThemeContext )

  const { listId } = route.params

  const dispatch = useDispatch()

  const lists = useSelector( ( state: RootState ) => state.todos.lists )
  const list = lists.find( ( l ) => l.id === listId )

  // @ts-expect-error @todo: need to pull this directly from store.
  const todos = list?.todos || []

  const [ newTodoText, setNewTodoText ] = React.useState( '' )

  const themeColors = useThemeColors()

  // Fetch todos for the selected list on component mount or when listId changes
  useFocusEffect(
    React.useCallback( () => {
      if ( listId ) {
        // @ts-expect-error @todo: fix ts error.
        dispatch( fetchTodosByListId( listId ) )
      }
    }, [ dispatch, listId ] ),
  )

  if ( !list ) return null

  /**
   * Handle removing a list entirely.
   */
  const handleRemoveList = ( lstId: string ) => {
    // @ts-expect-error @todo: fix ts error.
    dispatch( removeList( lstId ) )
    navigation.goBack() // Navigate back after removing the list
  }

  /**
   * Add todo.
   */
  const handleAddTodo = () => {
    if ( !newTodoText.trim() ) return

    dispatch(
      // @ts-expect-error @todo: defined shape.
      addTodo( {
        listId,
        // @ts-expect-error @todo: define shape.
        todo: {
          id: Date.now().toString(),
          text: newTodoText,
          status: 'incomplete',
        },
      } ),
    )

    setNewTodoText( '' )
  }

  /**
   * Remove a todo item.
   */
  const handleRemoveTodo = ( todoId: string ) => {
    // @ts-expect-error @todo: define type.
    dispatch( removeTodo( {
      listId,
      todoId,
    } ) )
  }

  /**
   * Toggle type status.
   */
  const handleToggleTodoStatus = ( todoId: string ) => {
    // @ts-expect-error @todo: define type.
    dispatch( toggleTodoStatus( {
      listId,
      todoId,
    } ) )
  }

  return (
    <LinearGradient colors={themeColors} style={{ flex: 1 }}>
      <SafeAreaView style={styles.container}>
        <Text style={theme === 'light' ? styles.title : styles.titleDark}>{list.name}</Text>

        {todos.length ? (
          <FlatList
            style={styles.list}
            data={todos}
            keyExtractor={( item ) => item.id}
            renderItem={( { item } ) => (
              <View style={styles.horizontal}>
                <Text
                  style={getNextStatus( item.status, theme )}
                  onPress={() => handleToggleTodoStatus( item.id )}
                >
                  {item.text}
                </Text>
                <Button
                  onPress={() => handleRemoveTodo( item.id )}
                  title="Remove"
                  type="remove"
                />
              </View>
            )}
          />
        ) : null}

        <Button
          onPress={() => navigation.goBack()}
          title="Go Back"
          type="secondary"
        />

        <TextInput
          style={theme === 'light' ? styles.input : styles.inputDark}
          placeholder="New Todo"
          value={newTodoText}
          onChangeText={setNewTodoText}
        />
        <Button title="Add Todo" onPress={handleAddTodo} />
        <Button
          title="Remove List"
          onPress={() => handleRemoveList( list.id )}
          type="secondary"
        />
      </SafeAreaView>
    </LinearGradient>
  )
}

const styles = StyleSheet.create( {
  container: {
    flex: 1,
    padding: 16,
  },
  input: themeStyles.input.light as ViewStyle,
  inputDark: themeStyles.input.dark as ViewStyle,
  title: themeStyles.title.light as ViewStyle,
  titleDark: themeStyles.title.dark as ViewStyle,
  list: {
    marginTop: 20,
  },
  horizontal: {
    flexDirection: 'row',
    marginBottom: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: 4,
    borderRadius: 4,
    alignItems: 'center',
  },
  todo: {
    fontSize: 16,
    flex: 1,
  },
  todoDark: {
    fontSize: 16,
    flex: 1,
  },
  todoComplete: {
    textDecorationLine: 'line-through',
    fontSize: 16,
    color: 'gray',
  },
  todoCompleteDark: {
    textDecorationLine: 'line-through',
    fontSize: 16,
    color: 'gray',
  },
  todoPartiallyComplete: {
    fontSize: 16,
    color: 'rgb(252, 7, 11)',
  },
  todoPartiallyCompleteDark: {
    fontSize: 16,
    color: 'rgb(174, 7, 169)',
  },
} )

const getNextStatus = ( currentStatus: 'incomplete' | 'partially-complete' | 'complete', theme: Theme ) => {
  switch ( currentStatus ) {
    case 'partially-complete':
      return theme === 'light' ? styles.todoPartiallyComplete : styles.todoPartiallyCompleteDark
    case 'complete':
      return theme === 'light' ? styles.todoComplete : styles.todoCompleteDark
    default:
      return theme === 'light' ? styles.todo : styles.todoDark
  }
}

export default ListScreen
