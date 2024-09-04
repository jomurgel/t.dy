import Button from '../components/Button';
import React, { useContext} from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { RootStackParamList } from '../../App';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StackNavigationProp } from '@react-navigation/stack';
import { StyleSheet, View, Text } from 'react-native';
import { useAuth } from '../providers/AuthProvider';
import ThemeContext from '../providers/ThemeProvider';
import useThemeColors from '../hooks/useThemeColors';

type SettingsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Settings'>;

interface SettingsScreenProps {
  navigation: SettingsScreenNavigationProp;
}

const SettingsScreen: React.FC<SettingsScreenProps> = ({ navigation }) => {

  const { signOut } = useAuth();
  const themeColors = useThemeColors()

  const {theme, toggleTheme} = useContext(ThemeContext);

  const handleToggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    toggleTheme(newTheme);
  };

  return (
    <LinearGradient
      colors={themeColors}
      style={{
        flex: 1,
      }}
    >
      <SafeAreaView style={styles.container}>
      <Text style={styles.logo}>Settings</Text>
            <Button
              title="Sign out"
              onPress={() => {
                signOut()
                toggleTheme('light')
              }}
            />
            <Button
              title="Change Theme"
              onPress={handleToggleTheme}
            />
            <Button
              title="Back"
              onPress={() => navigation.navigate('Main')}
              type="secondary"
            />
      </SafeAreaView>
    </LinearGradient>
  );
}

export default SettingsScreen;

// @todo: add to shared styles export.
const yellow = '#ffcc00';
const white = '#fff';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  logo: {
      color: white,
      fontSize: 48,
      marginBottom: 25,
  },
});