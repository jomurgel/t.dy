import { LinearGradient } from 'expo-linear-gradient'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StackNavigationProp } from '@react-navigation/stack'
import {
  StyleSheet, Text, TextInput, ViewStyle,
} from 'react-native'
import { useState, ReactElement, useContext } from 'react'
import { RootStackParamList } from '../types/todos'
import useThemeColors from '../hooks/useThemeColors'
import useAuth from '../hooks/useAuth'
import Button from '../components/Button'
import themeStyles from '../lib/themeConfig'
import { ThemeContext } from '../providers/ThemeProvider'

type LogInScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'SignUp'
>

interface LogInScreenProps {
  navigation: LogInScreenNavigationProp
}

/**
 * Login screen.
 *
 * @todo: need more feedback on errors.
 */
function LogInScreen( { navigation } ): ReactElement<LogInScreenProps> {
  const [ email, setEmail ] = useState( '' )
  const [ password, setPassword ] = useState( '' )

  const { theme } = useContext( ThemeContext )
  const themeColors = useThemeColors()
  const { loading, signInWithEmail } = useAuth()

  return (
    <LinearGradient
      colors={themeColors}
      style={{
        flex: 1,
      }}
    >
      <SafeAreaView style={styles.container}>
        <Text style={theme === 'light' ? styles.title : styles.titleDark}>Log In!</Text>
        <TextInput
          placeholder="Email"
          onChangeText={( text ) => {
            setEmail( text )
          }}
          value={email}
          keyboardType="email-address"
          autoCapitalize="none"
          textContentType="emailAddress"
          style={styles.input}
        />
        <TextInput
          placeholder="Password"
          onChangeText={( text ) => setPassword( text )}
          value={password}
          secureTextEntry
          autoCapitalize="none"
          textContentType="password"
          style={styles.input}
        />
        <Button
          disabled={loading}
          onPress={() => signInWithEmail( email, password )}
          title={loading ? 'Signing In...' : 'Sign In'}
        />
        <Button
          onPress={() => navigation.goBack()}
          title="Go Back"
          type="secondary"
        />
      </SafeAreaView>
    </LinearGradient>
  )
}

export default LogInScreen

const styles = StyleSheet.create( {
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  input: themeStyles.input.light as ViewStyle,
  inputDark: themeStyles.input.dark as ViewStyle,
  title: themeStyles.title.light as ViewStyle,
  titleDark: themeStyles.title.dark as ViewStyle,
} )
