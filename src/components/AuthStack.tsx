import LogInScreen from '../screens/LogIn';
import SignUpScreen from '../screens/SignUp';
import SplashScreen from '../screens/Splash';
import { createStackNavigator } from '@react-navigation/stack';
import { RootStackParamList } from '../../App';

const Stack = createStackNavigator<RootStackParamList>();

const AuthStack = () => {
  return (
    <Stack.Navigator initialRouteName="Splash">
      <Stack.Screen
        options={{ headerShown: false }}
        name="Splash"
        component={SplashScreen}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="SignUp"
        component={SignUpScreen}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="LogIn"
        component={LogInScreen}
      />
    </Stack.Navigator>
  )
}

export default AuthStack;