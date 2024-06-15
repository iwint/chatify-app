import ListBlock from '@components/sections/list-block';
import MainLayout, { HeaderOptions } from '@layouts/main-layout';
import { useTheme } from '@react-navigation/native';
import { ThemeProps } from '@utils/theme';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import CHATS_DATA from '@assets/data/chats.json';
import { Chat } from '@models/chats';
import ChatsCard from '@components/cards/chats-card';

interface ChatsProps {}

const Chats: React.FC<ChatsProps> = ({}) => {
    //@ts-ignore
    const theme: ThemeProps = useTheme();
    const styles = makeStyles(theme);

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
                <TouchableOpacity>
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
