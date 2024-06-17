import { useTheme } from '@react-navigation/native';
import { ThemeProps } from '@utils/theme';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface NewChatProps {}

const NewChat: React.FC<NewChatProps> = ({}) => {
    //@ts-ignore
    const theme: ThemeProps = useTheme();
    const styles = makeStyles(theme);
    return (
        <SafeAreaView style={styles.container}>
            <View></View>
        </SafeAreaView>
    );
};

export default NewChat;

const makeStyles = (theme: ThemeProps) =>
    StyleSheet.create({
        container: {
            height: '95%',
            borderTopStartRadius: 10,
            borderTopEndRadius: 10,
            backgroundColor: theme.colors.white,
            justifyContent: 'center',
            alignItems: 'center'
        }
    });
