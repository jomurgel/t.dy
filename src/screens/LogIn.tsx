import Button from '../components/Button';
import { LinearGradient } from 'expo-linear-gradient';
import { RootStackParamList } from '../../App';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StackNavigationProp } from '@react-navigation/stack';
import { StyleSheet, Text, TextInput } from 'react-native';
import { useAuth } from '../providers/AuthProvider';
import { useState } from 'react';
import useThemeColors from '../hooks/useThemeColors';

type LogInScreenNavigationProp = StackNavigationProp<RootStackParamList, 'SignUp'>;

interface LogInScreenProps {
    navigation: LogInScreenNavigationProp;
}
const LogInScreen: React.FC<LogInScreenProps> = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


  const themeColors = useThemeColors()
    const { loading, signInWithEmail } = useAuth();

    return (
        <LinearGradient
            colors={themeColors}
            style={{
                flex: 1,
            }}
        >
            <SafeAreaView style={styles.container}>
                <Text style={styles.logo}>Log In!</Text>
                <TextInput
                    placeholder="Email"
                    onChangeText={(text) => {
                        setEmail(text);
                    }}
                    value={email}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    textContentType="emailAddress"
                    style={styles.input}
                />
                <TextInput
                    placeholder="Password"
                    onChangeText={(text) => setPassword(text)}
                    value={password}
                    secureTextEntry={true}
                    autoCapitalize="none"
                    textContentType="password"
                    style={styles.input}
                />
                <Button
                    disabled={loading}
                    onPress={() => signInWithEmail(email, password)}
                    title={loading ? 'Signing In...' : 'Sign In'}
                />
                <Button
                    onPress={() => navigation.goBack()}
                    title="Go Back"
                    type="secondary"
                />
            </SafeAreaView>
        </LinearGradient>
    );
}

export default LogInScreen;

// @todo: add to shared styles export.
const yellow = '#ffcc00';
const white = '#fff';
const red = 'rgba(238,113,113,0.5)';
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        borderRadius: 4,
        borderColor: red,
        borderWidth: 1,
        borderStyle: 'solid',
        backgroundColor: white,
        marginBottom: 10,
        padding: 8,
        alignSelf: 'stretch',
        marginLeft: 20,
        marginRight: 20,
        fontSize: 16,
    },
    logo: {
        color: white,
        fontSize: 48,
        marginBottom: 15,
    },
});
