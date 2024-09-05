import React, { ReactElement, useContext } from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StackNavigationProp } from '@react-navigation/stack'
import { StyleSheet, Text, ViewStyle } from 'react-native'
import Button from '../components/Button'
import themeStyles from '../lib/themeConfig'
import useAuth from '../hooks/useAuth'
import useThemeColors from '../hooks/useThemeColors'
import { RootStackParamList } from '../types/todos'
import { Theme, ThemeContext } from '../providers/ThemeProvider'

type SettingsScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Settings'
>

interface SettingsScreenProps {
  navigation: SettingsScreenNavigationProp
}

function SettingsScreen( { navigation } ): ReactElement<SettingsScreenProps> {
  const { signOut } = useAuth()
  const themeColors = useThemeColors()

  const { theme, toggleTheme } = useContext( ThemeContext )

  const handleToggleTheme = () => {
    const newTheme = theme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT
    toggleTheme( newTheme )
  }

  return (
    <LinearGradient
      colors={themeColors}
      style={{
        flex: 1,
      }}
    >
      <SafeAreaView style={styles.container}>
        <Text style={theme === 'light' ? styles.title : styles.titleDark}>Settings</Text>
        <Button
          title="Sign out"
          onPress={() => {
            signOut()
            toggleTheme( Theme.LIGHT )
          }}
        />
        <Button title="Change Theme" onPress={handleToggleTheme} />
        <Button
          title="Back"
          onPress={() => navigation.navigate( 'Main' )}
          type="secondary"
        />
      </SafeAreaView>
    </LinearGradient>
  )
}

export default SettingsScreen

const styles = StyleSheet.create( {
  container: {
    flex: 1,
    padding: 16,
  },
  title: themeStyles.title.light as ViewStyle,
  titleDark: themeStyles.title.dark as ViewStyle,
} )
