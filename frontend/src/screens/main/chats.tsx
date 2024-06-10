import { useTheme } from '@react-navigation/native';
import { ThemeProps } from '@utils/theme';
import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface ChatsProps {}

const Chats: React.FC<ChatsProps> = ({}) => {
    //@ts-ignore
    const theme: ThemeProps = useTheme();
    const styles = makeStyles(theme);
    return (
        <SafeAreaView style={styles.container}>
            <Text>Chats</Text>
        </SafeAreaView>
    );
};

export default Chats;

const makeStyles = (theme: ThemeProps) =>
    StyleSheet.create({
        container: {
            flex: 1,
            padding: 20,
            justifyContent: 'center',
            alignItems: 'center'
        }
    });
