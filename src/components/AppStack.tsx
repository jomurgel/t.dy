import { createStackNavigator } from '@react-navigation/stack'
import MainScreen from '../screens/Main'
import SettingsScreen from '../screens/Settings'
import { RootStackParamList } from '../types/todos'
import ListScreen from '../screens/Lists'

const Stack = createStackNavigator<RootStackParamList>()

function AppStack() {
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
      <Stack.Screen
        options={{ headerShown: false }}
        name="List"
        component={ListScreen}
      />
    </Stack.Navigator>
  )
}
export default AppStack
