
import AppStack from './src/components/AppStack';
import AuthStack from './src/components/AuthStack';
import store from './src/store/store';
import { AuthProvider, useAuth } from './src/providers/AuthProvider';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider } from './src/providers/ThemeProvider';

export type RootStackParamList = {
  Main: undefined;
  Settings: undefined;
  Splash: undefined,
  SignUp: undefined,
  LogIn: undefined,
  ForgotPassword: undefined,
  PasswordChange: undefined,
};

const AppNavigation = () => {
  const { session } = useAuth();
  return (session && session.user ? <AppStack /> : <AuthStack />);
}

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <Provider store={store}>
          <SafeAreaProvider>
            <NavigationContainer>
              <AppNavigation />
            </NavigationContainer>
          </SafeAreaProvider>
        </Provider>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;