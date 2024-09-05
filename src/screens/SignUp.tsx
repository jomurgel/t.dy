import { LinearGradient } from 'expo-linear-gradient'
import {
  ReactElement, useContext, useEffect, useState,
} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StackNavigationProp } from '@react-navigation/stack'
import { StatusBar } from 'expo-status-bar'
import {
  StyleSheet, Text, TextInput, ViewStyle,
} from 'react-native'
import { RootStackParamList } from '../types/todos'
import useThemeColors from '../hooks/useThemeColors'
import useAuth from '../hooks/useAuth'
import Button from '../components/Button'
import themeStyles from '../lib/themeConfig'
import { ThemeContext } from '../providers/ThemeProvider'

type SignUpScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'SignUp'
>

interface SignUpScreenProps {
  navigation: SignUpScreenNavigationProp
}
function SignUpScreen( { navigation } ): ReactElement<SignUpScreenProps> {
  const [ email, setEmail ] = useState( '' )
  const [ password, setPassword ] = useState( '' )
  const [ retypePassword, setRetypePassword ] = useState( '' )
  const [ name, setName ] = useState( '' )

  /**
   * Providers.
   */
  const { theme } = useContext( ThemeContext )
  const themeColors = useThemeColors()
  const {
    error, session, user, signUpNewUser,
  } = useAuth()

  /**
   * Redirect the user after creation.
   */
  useEffect( () => {
    if ( user && user.aud === 'authenticated' && !session ) {
      navigation.navigate( 'LogIn' )
    }
  }, [ user, session, navigation ] )

  return (
    <LinearGradient
      colors={themeColors}
      style={{
        flex: 1,
      }}
    >
      <SafeAreaView style={styles.container}>
        <Text style={theme === 'light' ? styles.title : styles.titleDark}>Registration!</Text>
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
          placeholder="Chosen Name"
          onChangeText={( text ) => setName( text )}
          value={name}
          autoCapitalize="none"
          textContentType="name"
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
        <TextInput
          placeholder="Retype Password"
          onChangeText={( text ) => setRetypePassword( text )}
          value={retypePassword}
          secureTextEntry
          autoCapitalize="none"
          textContentType="password"
          style={styles.input}
        />
        {error ? <Text>{error.toString()}</Text> : null}
        <Button
          onPress={() => signUpNewUser( email, name, password )}
          title="Register"
        />
        <Button
          onPress={() => navigation.goBack()}
          title="Go Back"
          type="secondary"
        />
        <StatusBar />
      </SafeAreaView>
    </LinearGradient>
  )
}

export default SignUpScreen

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
