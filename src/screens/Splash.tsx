import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Button from '../components/Button';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../App';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import useThemeColors from '../hooks/useThemeColors';

type SplashScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Splash'>;

interface SplashScreenProps {
    navigation: SplashScreenNavigationProp;
}
const SplashScreen: React.FC<SplashScreenProps> = ({ navigation }) => {
  const themeColors = useThemeColors()
    return (
        <LinearGradient
            colors={themeColors}
            style={{
                flex: 1,
            }}
        >
            <SafeAreaView style={styles.container}>
                <Text style={styles.logo}>T◩DY</Text>
                <View style={{ marginTop: 20 }}>
                    <Button
                        title="Sign Up"
                        onPress={() => navigation.navigate('SignUp')}
                    />
                    <Button
                        title="Log In"
                        onPress={() => navigation.navigate('LogIn')}
                        type="secondary"
                    />
                </View>
                <StatusBar />
            </SafeAreaView>
        </LinearGradient>
    );
}

export default SplashScreen;

// @todo: add to shared styles export.
const yellow = '#ffcc00';
const white = '#fff';
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo: {
        color: white,
        fontSize: 48,
    },
});
