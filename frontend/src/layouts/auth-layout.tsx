import { useTheme } from '@react-navigation/native';
import { ThemeProps } from '@utils/theme';
import React, { PropsWithChildren } from 'react';
import { Image, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface AuthLayoutProps {
    hideImage?: boolean;
}

const welcomeImage = Image.resolveAssetSource(
    require('@assets/images/welcome-image.png')
).uri;

const AuthLayout: React.FC<PropsWithChildren<AuthLayoutProps>> = ({
    children,
    hideImage,
}) => {
    const theme = useTheme();
    const styles = makeStyles(theme as unknown as ThemeProps, hideImage);
    return (
        <SafeAreaView style={styles.container}>
            <>
                <Image source={{ uri: welcomeImage }} style={styles.welcome} />
                {children}
            </>
        </SafeAreaView>
    );
};

export default AuthLayout;

const makeStyles = (theme: ThemeProps, hideImage?: boolean) =>
    StyleSheet.create({
        container: {
            flex: 1,
            padding: 20,
            backgroundColor: theme.colors.background,
            marginTop: hideImage ? 0 : theme.getResponsive(100, 'height'),
        },
        welcome: {
            resizeMode: 'contain',
            width: '100%',
            height: theme.getResponsive(270, 'width'),
            marginBottom: theme.getResponsive(30, 'height'),
            display: hideImage ? 'none' : 'flex',
        },
        loading: {
            ...StyleSheet.absoluteFillObject,
            zIndex: 10,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: theme.colors.background,
        },
    });
