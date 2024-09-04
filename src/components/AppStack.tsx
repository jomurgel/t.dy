import MainScreen from '../screens/Main';
import SettingsScreen from '../screens/Settings';
import { createStackNavigator } from '@react-navigation/stack';
import { RootStackParamList } from '../../App';

const Stack = createStackNavigator<RootStackParamList>();

const AppStack = () => {
  return (
    <Stack.Navigator initialRouteName="Main">
      <Stack.Screen
        options={{ headerShown: false }}
        name="Main"
        component={MainScreen}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="Settings"
        component={SettingsScreen}
      />
    </Stack.Navigator>
  )
}
export default AppStack;