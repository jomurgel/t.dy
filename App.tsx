import { NavigationContainer } from '@react-navigation/native'
import { Provider } from 'react-redux'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { ReactElement } from 'react'
import AppStack from './src/components/AppStack'
import AuthStack from './src/components/AuthStack'
import store from './src/redux/store'
import { AuthProvider, useAuth } from './src/providers/AuthProvider'
import { ThemeProvider } from './src/providers/ThemeProvider'

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
