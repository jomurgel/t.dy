import React, { ReactElement } from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StackNavigationProp } from '@react-navigation/stack'
import { StyleSheet } from 'react-native'
import { RootStackParamList } from '../types/todos'
import useThemeColors from '../hooks/useThemeColors'
import Todos from '../components/Todos'
import Button from '../components/Button'

type MainScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Main'>

interface MainScreenProps {
  navigation: MainScreenNavigationProp
}

function MainScreen( { navigation } ): ReactElement<MainScreenProps> {
  const themeColors = useThemeColors()
  return (
    <LinearGradient
      colors={themeColors}
      style={{
        flex: 1,
      }}
    >
      <SafeAreaView style={styles.container}>
        <Todos />
        <Button
          title="Settings"
          onPress={() => navigation.navigate( 'Settings' )}
          type="back"
        />
      </SafeAreaView>
    </LinearGradient>
  )
}

export default MainScreen

const styles = StyleSheet.create( {
  container: {
    flex: 1,
  },
} )
