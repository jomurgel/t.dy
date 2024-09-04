import { StatusBar } from 'expo-status-bar'
import Button from '../components/Button';
import { StyleSheet, Text, TextInput } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../App';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { useEffect, useState } from 'react';
import { useAuth } from '../providers/AuthProvider';
import useThemeColors from '../hooks/useThemeColors';

type SignUpScreenNavigationProp = StackNavigationProp<RootStackParamList, 'SignUp'>;

interface SignUpScreenProps {
    navigation: SignUpScreenNavigationProp;
}
const SignUpScreen: React.FC<SignUpScreenProps> = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [retypePassword, setRetypePassword] = useState('');
    const [name, setName] = useState('');


  const themeColors = useThemeColors()
    const { error, session, user, signUpNewUser } = useAuth();

    useEffect(() => {
        if (user && user.aud === 'authenticated' && ! session ) {
            navigation.navigate('LogIn');
        }
    }, [user]);

    return (
        <LinearGradient
            colors={themeColors}
            style={{
                flex: 1,
            }}
        >
            <SafeAreaView style={styles.container}>
                <Text style={styles.logo}>Registration!</Text>
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
                    placeholder="Chosen Name"
                    onChangeText={(text) => setName(text)}
                    value={name}
                    autoCapitalize="none"
                    textContentType="name"
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
                <TextInput
                    placeholder="Retype Password"
                    onChangeText={(text) => setRetypePassword(text)}
                    value={retypePassword}
                    secureTextEntry={true}
                    autoCapitalize="none"
                    textContentType="password"
                    style={styles.input}
                />
                {error ? <Text>{error.toString()}</Text> : null}
                <Button
                    onPress={() => signUpNewUser(email, name, password)}
                    title="Register"
                />
                <StatusBar />
            </SafeAreaView>
        </LinearGradient>
    );
}

export default SignUpScreen;

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
        alignSelf:  'stretch',
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
