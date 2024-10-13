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
import { AuthStatus } from './auth';
import Button from '@components/buttons/button';

interface LoginProps {}

const Login: React.FC<LoginProps> = ({}) => {
    // @ts-ignore
    const theme: ThemeProps = useTheme();
    const styles = makeStyles(theme);
    const navigation = useNavigation();
    const { bottom } = useSafeAreaInsets();
    const [step, setStep] = useState<AuthStatus>('login');
    const handleNavigation = () => {
        navigation.dispatch(StackActions.push('OTP', { phone: '' }));
    };
    const keyboardOffset = Platform.OS === 'ios' ? 'padding' : 'padding';
    const formData = getFormData(step);
    return (
        <AuthLayout hideImage={step !== 'login'}>
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
                    <Button
                        size="full"
                        style={{
                            marginBottom: bottom,
                        }}
                        onPress={handleNavigation}
                        title="Get Started"
                    />
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
