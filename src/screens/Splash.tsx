import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View } from 'react-native'
import { StackNavigationProp } from '@react-navigation/stack'
import { SafeAreaView } from 'react-native-safe-area-context'
import { LinearGradient } from 'expo-linear-gradient'
import { ReactElement, useContext } from 'react'
import { RootStackParamList } from '../types/todos'
import Button from '../components/Button'
import useThemeColors from '../hooks/useThemeColors'
import themeStyles from '../lib/themeConfig'
import { ThemeContext } from '../providers/ThemeProvider'

type SplashScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Splash'
>

interface SplashScreenProps {
  navigation: SplashScreenNavigationProp
}
function SplashScreen( { navigation } ): ReactElement<SplashScreenProps> {
  const themeColors = useThemeColors()
  const { theme } = useContext( ThemeContext )
  return (
    <LinearGradient
      colors={themeColors}
      style={{
        flex: 1,
      }}
    >
      <SafeAreaView style={styles.container}>
        <Text style={theme === 'light' ? styles.title : styles.titleDark}>T◩DY</Text>
        <View style={{ marginTop: 20 }}>
          <Button
            title="Sign Up"
            onPress={() => navigation.navigate( 'SignUp' )}
          />
          <Button
            title="Log In"
            onPress={() => navigation.navigate( 'LogIn' )}
            type="secondary"
          />
        </View>
        <StatusBar />
      </SafeAreaView>
    </LinearGradient>
  )
}

export default SplashScreen

const styles = StyleSheet.create( {
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    color: themeStyles.color.white.light,
    fontSize: 48,
  },
  titleDark: {
    color: themeStyles.color.white.dark,
    fontSize: 48,
  },
} )
