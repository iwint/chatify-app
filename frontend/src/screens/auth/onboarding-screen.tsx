import Button from '@components/buttons/button';
import Colors from '@constants/colors';
import AuthLayout from '@layouts/auth-layout';
import {
    useNavigation,
    useTheme,
    StackActions
} from '@react-navigation/native';
import { ThemeProps } from '@utils/theme';
import React, { useCallback } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface OnboardingScreenProps {}

const OnboardingScreen: React.FC<OnboardingScreenProps> = ({}) => {
    const theme = useTheme();
    const styles = makeStyles(theme as unknown as ThemeProps);
    const navigation = useNavigation();
    const { bottom } = useSafeAreaInsets();
    const handleNavigation = useCallback(() => {
        navigation.dispatch(StackActions.replace('Login'));
    }, [navigation, StackActions]);

    return (
        <AuthLayout>
            <Text style={styles.heading}>Welcome to the Chatify</Text>
            <Text style={styles.description}>
                Chatify is a messaging app that lets you chat with friends and
                family. You can send messages, photos, and videos. You can also
                make voice and video calls.
            </Text>
            <View style={{ flex: 1 }} />
            <Button
                size="full"
                style={{
                    marginBottom: bottom
                }}
                onPress={handleNavigation}
                title="Get Started"
            />
        </AuthLayout>
    );
};

export default OnboardingScreen;

const makeStyles = (theme: ThemeProps) =>
    StyleSheet.create({
        container: {
            flex: 1,
            padding: 20,
            alignItems: 'center',
            marginTop: theme.getResponsive(100, 'height')
        },
        welcome: {
            resizeMode: 'contain',
            width: '100%',
            height: 300,
            marginBottom: theme.getResponsive(30, 'height')
        },
        heading: {
            fontSize: 24,
            fontWeight: 'bold',
            marginVertical: 20,
            color: theme.colors.text,
            textAlign: 'center'
        },
        description: {
            color: theme.colors.text,
            textAlign: 'center'
        },
        link: {
            color: Colors.gray
        }
    });
