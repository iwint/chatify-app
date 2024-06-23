import { useHideBottomBar } from '@hooks/use-hide-bottom-tab';
import MainLayout, { HeaderOptions } from '@layouts/main-layout';
import { Chat } from '@models/chats';
import { useTheme } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ThemeProps } from '@utils/theme';
import React, { useCallback, useEffect, useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { GiftedChat, IMessage } from 'react-native-gifted-chat';
import Icon from 'react-native-vector-icons/Ionicons';

interface SingleChatProps extends NativeStackScreenProps<any> {}

const SingleChat: React.FC<SingleChatProps> = (props) => {
    //@ts-ignore
    const theme: ThemeProps = useTheme();
    const styles = makeStyles(theme);
    useHideBottomBar();
    const { from, img } = props.route.params?.data as Chat;

    const [messages, setMessages] = useState<IMessage[]>([]);

    useEffect(() => {
        setMessages([
            {
                _id: 1,
                text: 'This is a quick reply. Do you love Gifted Chat? (radio) KEEP IT',
                createdAt: new Date(),
                quickReplies: {
                    type: 'radio', // or 'checkbox',
                    keepIt: true,
                    values: [
                        {
                            title: '😋 Yes',
                            value: 'yes'
                        },
                        {
                            title: '📷 Yes, let me show you with a picture!',
                            value: 'yes_picture'
                        },
                        {
                            title: '😞 Nope. What?',
                            value: 'no'
                        }
                    ]
                },
                user: {
                    _id: 2,
                    name: 'React Native',
                    avatar: img
                }
            },
            {
                _id: 2,
                text: 'This is a quick reply. Do you love Gifted Chat? (checkbox)',
                createdAt: new Date(),
                quickReplies: {
                    type: 'checkbox', // or 'radio',
                    values: [
                        {
                            title: 'Yes',
                            value: 'yes'
                        },
                        {
                            title: 'Yes, let me show you with a picture!',
                            value: 'yes_picture'
                        },
                        {
                            title: 'Nope. What?',
                            value: 'no'
                        }
                    ]
                },
                user: {
                    _id: 2,
                    name: 'React Native',
                    avatar: img
                }
            }
        ]);
    }, []);

    const headerOptions: HeaderOptions = {
        headerTitle: (
            <View style={styles.content}>
                <Image source={{ uri: img }} style={styles.avatar} />
                <View style={{ flex: 0.5 }}>
                    <Text style={styles.title}>{from}</Text>
                </View>
            </View>
        ),
        headerRight: (
            <View style={styles.headerRightWrapper}>
                <TouchableOpacity>
                    <Icon
                        name="videocam-outline"
                        size={theme.getResponsive(30, 'width')}
                        color={theme.colors.primary}
                    />
                </TouchableOpacity>
                <TouchableOpacity>
                    <Icon
                        name="call-outline"
                        size={theme.getResponsive(30, 'width')}
                        color={theme.colors.primary}
                    />
                </TouchableOpacity>
            </View>
        )
    };

    const onSend = useCallback((messages = []) => {
        setMessages((previousMessages) =>
            GiftedChat.append(previousMessages, messages)
        );
    }, []);

    return (
        <MainLayout headerOptions={headerOptions}>
            <GiftedChat
                messages={messages}
                onSend={(messages: any) => onSend(messages)}
                user={{
                    _id: 1,
                    avatar: img
                }}
            />
        </MainLayout>
    );
};

export default SingleChat;

const makeStyles = (theme: ThemeProps) =>
    StyleSheet.create({
        container: {
            flex: 1,
            padding: 20,
            justifyContent: 'center',
            alignItems: 'center'
        },
        avatar: {
            width: theme.getResponsive(40, 'width'),
            height: theme.getResponsive(40, 'height'),
            borderRadius: 50
        },
        title: {
            fontWeight: '500',
            fontSize: 16,
            color: theme.colors.text
        },
        content: {
            flexDirection: 'row',
            alignItems: 'center',
            gap: 10
        },
        headerRightWrapper: {
            flexDirection: 'row',
            alignItems: 'center',
            gap: theme.getResponsive(30, 'width')
        }
    });
