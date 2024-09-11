import Button from '@components/buttons/button';
import AuthLayout from '@layouts/auth-layout';
import {
    StackActions,
    useNavigation,
    useTheme,
} from '@react-navigation/native';
import { ThemeProps } from '@utils/theme';
import React, { useState } from 'react';
import {
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { getFormData } from './helper';
import Input from '@components/inputs';
import { AuthStatus } from './auth.types';

interface LoginProps {}

const Login: React.FC<LoginProps> = ({}) => {
    // @ts-ignore
    const theme: ThemeProps = useTheme();
    const styles = makeStyles(theme);
    const navigation = useNavigation();
    const { bottom } = useSafeAreaInsets();
    const [phone, setPhone] = useState('');
    const status: AuthStatus = 'register';
    const handleNavigation = () => {
        navigation.dispatch(StackActions.push('OTP', { phone: phone }));
    };
    const authenticateUser = async () => {};
    const keyboardOffset = Platform.OS === 'ios' ? 'padding' : 'padding';
    const formData = getFormData(status);
    return (
        <AuthLayout>
            <KeyboardAvoidingView
                behavior={keyboardOffset}
                style={{ flex: 1, justifyContent: 'flex-end' }}
            >
                <View style={styles.container}>
                    <View style={{ width: '100%', gap: 10 }}>
                        {formData.map((input, index) => (
                            <Input
                                key={index}
                                icon={input.icon}
                                style={styles.input}
                                secureTextEntry={input.secureTextEntry}
                                placeholder={input.placeholder}
                                inputMode={input.inputMode}
                            />
                        ))}
                    </View>
                    <Text style={styles.description}>
                        Chatify will need to verify your account. Carrier
                        charges may apply.
                    </Text>
                    <View style={{ flex: 1 }} />
                    <View style={{ width: '100%' }}>
                        <Button
                            size="full"
                            style={{
                                marginBottom: bottom,
                            }}
                            onPress={handleNavigation}
                            title="Get Started"
                        />
                    </View>
                </View>
            </KeyboardAvoidingView>
        </AuthLayout>
    );
};

const makeStyles = (theme: ThemeProps) =>
    StyleSheet.create({
        container: {
            gap: 20,
            alignItems: 'center',
            justifyContent: 'flex-end',
            height: '80%',
            flex: 1,
        },
        description: {
            color: theme.colors.text,
        },
        loading: {
            ...StyleSheet.absoluteFillObject,
            zIndex: 10,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: theme.colors.background,
        },
        googleButton: {
            width: '100%',
            borderRadius: 10,
            minHeight: 50,
        },
        input: {
            height: 50,
        },
    });

export default Login;
