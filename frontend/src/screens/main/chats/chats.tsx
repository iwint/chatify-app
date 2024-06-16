import CHATS_DATA from '@assets/data/chats.json';
import ChatsCard from '@components/cards/chats-card';
import ListBlock from '@components/sections/list-block';
import MainLayout, { HeaderOptions } from '@layouts/main-layout';
import { Chat } from '@models/chats';
import { useNavigation, useTheme } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ThemeProps } from '@utils/theme';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

interface ChatsProps {}

const Chats: React.FC<ChatsProps> = ({}) => {
    //@ts-ignore
    const theme: ThemeProps = useTheme();
    const styles = makeStyles(theme);
    const navigation = useNavigation<NativeStackNavigationProp<any>>();
    const navigateToNewChat = () => {
        navigation.navigate('NewChat');
    };
    const headerOptions: HeaderOptions = {
        headerLeft: (
            <TouchableOpacity>
                <Icon
                    name="ellipsis-horizontal-circle"
                    size={theme.getResponsive(30, 'width')}
                    color={theme.colors.primary}
                />
            </TouchableOpacity>
        ),
        headerRight: (
            <View style={styles.headerRightWrapper}>
                <TouchableOpacity>
                    <Icon
                        name="camera-outline"
                        size={theme.getResponsive(30, 'width')}
                        color={theme.colors.primary}
                    />
                </TouchableOpacity>
                <TouchableOpacity onPress={navigateToNewChat}>
                    <Icon
                        name="add-circle"
                        size={theme.getResponsive(30, 'width')}
                        color={theme.colors.primary}
                    />
                </TouchableOpacity>
            </View>
        )
    };
    return (
        <MainLayout headerOptions={headerOptions}>
            <ListBlock
                data={CHATS_DATA}
                renderComponent={(item: Chat) => <ChatsCard {...item} />}
            />
        </MainLayout>
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
        },
        headerLeftButton: {
            color: theme.colors.primary,
            fontSize: theme.getResponsive(18, 'width')
        },
        headerRightWrapper: {
            flexDirection: 'row',
            alignItems: 'center',
            gap: theme.getResponsive(30, 'width')
        }
    });
