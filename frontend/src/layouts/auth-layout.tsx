import { Theme, useTheme } from '@react-navigation/native';
import { ThemeProps } from '@utils/theme';
import React from 'react';
import { Image, StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface AuthLayoutProps {
    children: React.ReactNode;
}

const welcomeImage = Image.resolveAssetSource(
    require('@assets/images/welcome-image.png')
).uri;

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
    const theme = useTheme();
    const styles = makeStyles(theme as unknown as ThemeProps);
    return (
        <SafeAreaView style={styles.container}>
            <Image source={{ uri: welcomeImage }} style={styles.welcome} />
            {children}
        </SafeAreaView>
    );
};

export default AuthLayout;

const makeStyles = (theme: ThemeProps) =>
    StyleSheet.create({
        container: {
            flex: 1,
            padding: 20,
            marginTop: theme.getResponsive(100, 'height'),
            backgroundColor: theme.colors.background
        },
        welcome: {
            resizeMode: 'contain',
            width: '100%',
            height: theme.getResponsive(270, 'width'),
            marginBottom: theme.getResponsive(30, 'height')
        }
    });
