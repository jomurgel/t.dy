import React, { useContext, useEffect } from 'react'
import {
  View, Text, TextInput, FlatList, StyleSheet, ViewStyle,
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useSelector, useDispatch } from 'react-redux'
import Button from './Button'
import useAuth from '../hooks/useAuth'
import { RootState } from '../redux/store'
import { TodoList } from '../types/todos'
import { addList, fetchLists } from '../redux/thunks/todoThunk'
import themeStyles from '../lib/themeConfig'
import { ThemeContext } from '../providers/ThemeProvider'

function Todos(): React.ReactElement {
  const [ newListTitle, setNewListTitle ] = React.useState( '' )

  const { theme } = useContext( ThemeContext )
  const { user } = useAuth()
  const navigation = useNavigation()

  const dispatch = useDispatch()

  const lists = useSelector( ( state: RootState ) => state.todos.lists )

  /**
   * Adds a new list.
   */
  const handleAddList = async () => {
    if ( !newListTitle.trim() ) {
      return
    }

    const listId = Date.now().toString()
    const newList: TodoList = {
      id: listId,
      name: newListTitle,
      user_id: user?.id || null,
    }

    // @ts-expect-error @todo: resolve ts error.
    await dispatch( addList( newList ) )
    setNewListTitle( '' )
    // @ts-expect-error @todo: resolve ts error.
    navigation.navigate( 'List', { listId } )
  }

  /**
   * Fetch lists after dispatch to refresh.
   */
  useEffect( () => {
    // Fetch lists from Supabase and update Redux store
    // @ts-expect-error @todo: resolve ts error.
    dispatch( fetchLists() )
  }, [dispatch] )

  return (
    <View style={styles.container}>
      <Text style={theme === 'light' ? styles.title : styles.titleDark}>T◩DY</Text>

      <FlatList
        data={lists}
        keyExtractor={( item ) => item.id}
        renderItem={( { item } ) => (
          <Button
            title={item.name}
            // @ts-expect-error @todo: resolve ts error.
            onPress={() => navigation.navigate( 'List', { listId: item.id } )}
          />
        )}
      />

      <TextInput
        style={theme === 'light' ? styles.input : styles.inputDark}
        placeholder="New List Title"
        value={newListTitle}
        onChangeText={setNewListTitle}
      />
      <Button title="Add List" onPress={handleAddList} />
    </View>
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
} )

export default Todos
