import { NavigationContainer } from '@react-navigation/native'
import { Provider } from 'react-redux'
import { ReactElement } from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import AppStack from './src/components/AppStack'
import AuthProvider from './src/providers/AuthProvider'
import AuthStack from './src/components/AuthStack'
import ThemeProvider from './src/providers/ThemeProvider'
import store from './src/redux/store'
import useAuth from './src/hooks/useAuth'

/**
 * Determines visibility of features based on user authentication.
 */
function AppNavigation(): ReactElement {
  const { session } = useAuth()
  return ( session && session.user ? <AppStack /> : <AuthStack /> )
}

/**
 * Main app entrypoint.
 */
function App(): ReactElement {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Provider store={store}>
          <SafeAreaProvider>
            <NavigationContainer>
              <AppNavigation />
            </NavigationContainer>
          </SafeAreaProvider>
        </Provider>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App
