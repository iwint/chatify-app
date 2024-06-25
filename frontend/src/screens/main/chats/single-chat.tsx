import messageData from '@assets/data/messages.json';
import { useHideBottomBar } from '@hooks/use-hide-bottom-tab';
import MainLayout, { HeaderOptions } from '@layouts/main-layout';
import { Chat } from '@models/chats';
import { useTheme } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ThemeProps } from '@utils/theme';
import React, { useCallback, useEffect, useState } from 'react';
import {
    Image,
    ImageBackground,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import {
    Actions,
    Bubble,
    Day,
    GiftedChat,
    IMessage,
    InputToolbar,
    Send,
    SystemMessage
} from 'react-native-gifted-chat';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';

interface SingleChatProps extends NativeStackScreenProps<any> {}

const SingleChat: React.FC<SingleChatProps> = (props) => {
    //@ts-ignore
    const theme: ThemeProps = useTheme();
    const styles = makeStyles(theme);
    useHideBottomBar();
    const { from, img } = props.route.params?.data as Chat;

    const [messages, setMessages] = useState<IMessage[]>([]);
    const [text, setText] = useState('');

    useEffect(() => {
        setMessages([
            ...messageData.map((message) => ({
                _id: message.id,
                text: message.msg,
                createdAt: new Date(message.date),
                user: {
                    _id: message.from,
                    name: from,
                    avatar: img
                }
            })),
            {
                _id: 0,
                system: true,
                text: 'Chats are encrypted',
                createdAt: new Date(),
                user: {
                    _id: 0,
                    name: 'Bot'
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

    const inset = useSafeAreaInsets();

    return (
        <MainLayout
            layoutOptions={{ scrollDisabled: true }}
            headerOptions={headerOptions}
        >
            <ImageBackground
                resizeMode="cover"
                resizeMethod="auto"
                style={{ flex: 1 }}
                source={{
                    uri: img
                }}
                blurRadius={2}
                imageStyle={{
                    opacity: 0.5
                }}
            >
                <GiftedChat
                    text={text}
                    onInputTextChanged={setText}
                    messages={messages}
                    onSend={(messages: any) => onSend(messages)}
                    renderAvatarOnTop
                    showAvatarForEveryMessage
                    user={{
                        _id: 1,
                        name: 'Iwin'
                    }}
                    renderSystemMessage={(props) => (
                        <SystemMessage
                            {...props}
                            textStyle={{
                                color: theme.colors.primary
                            }}
                        />
                    )}
                    renderDay={(props) => (
                        <Day
                            {...props}
                            textStyle={{
                                color: theme.dark
                                    ? theme.colors.lightGray
                                    : theme.colors.gray
                            }}
                        />
                    )}
                    timeTextStyle={{
                        right: {
                            color: theme.colors.gray
                        }
                    }}
                    bottomOffset={inset.bottom}
                    maxComposerHeight={100}
                    renderBubble={(props) => (
                        <Bubble
                            {...props}
                            textStyle={{
                                right: {
                                    color: theme.colors.black
                                }
                            }}
                            wrapperStyle={{
                                right: {
                                    backgroundColor: theme.colors.lightGreen
                                }
                            }}
                        />
                    )}
                    textInputProps={styles.input}
                    renderInputToolbar={(props) => (
                        <InputToolbar
                            {...props}
                            containerStyle={{
                                backgroundColor: theme.colors.background,
                                paddingVertical: 5
                            }}
                            renderActions={(props) => (
                                <Actions
                                    {...props}
                                    icon={() => (
                                        <Icon
                                            name="add"
                                            size={24}
                                            color={theme.colors.primary}
                                        />
                                    )}
                                />
                            )}
                        />
                    )}
                    renderSend={(props) => (
                        <View style={styles.sendButtonWrapper}>
                            {text.length > 0 && (
                                <Send
                                    {...props}
                                    sendButtonProps={{
                                        style: styles.sendButton
                                    }}
                                >
                                    <Icon
                                        name="send"
                                        size={24}
                                        color={theme.colors.primary}
                                    />
                                </Send>
                            )}
                            {text.length === 0 && (
                                <>
                                    <TouchableOpacity>
                                        <Icon
                                            name="camera-outline"
                                            size={28}
                                            color={theme.colors.primary}
                                        />
                                    </TouchableOpacity>
                                    <TouchableOpacity>
                                        <Icon
                                            name="mic-outline"
                                            size={28}
                                            color={theme.colors.primary}
                                        />
                                    </TouchableOpacity>
                                </>
                            )}
                        </View>
                    )}
                />
            </ImageBackground>
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
        },
        sendButton: {
            height: '100%',
            alignItems: 'center',
            justifyContent: 'center'
        },
        sendButtonWrapper: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
            paddingHorizontal: theme.getResponsive(10, 'width'),
            gap: theme.getResponsive(15, 'width')
        },
        input: {
            backgroundColor: theme.dark
                ? theme.colors.gray
                : theme.colors.white,
            height: '90%',
            borderRadius: 8,
            paddingHorizontal: 10,
            paddingVertical: 5,
            color: theme.colors.text
        }
    });
