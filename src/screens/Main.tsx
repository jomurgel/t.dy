import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../App';
import Todo from '../components/Todo'
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import Button from '../components/Button';
import useThemeColors from '../hooks/useThemeColors';

type MainScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Main'>;

interface MainScreenProps {
  navigation: MainScreenNavigationProp;
}

const MainScreen: React.FC<MainScreenProps> = ({ navigation }) => {
  const themeColors = useThemeColors()
  return (
    <LinearGradient
      colors={themeColors}
      style={{
        flex: 1,
      }}
    >
      <SafeAreaView style={styles.container}>
        <Todo />
        <Button
          title="Settings"
          onPress={() => navigation.navigate('Settings')}
          type="back"
        />
      </SafeAreaView>
    </LinearGradient>
  );
}

export default MainScreen;

// @todo: add to shared styles export.
const yellow = 'rgba(246,215,148,0.5)';
const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});
