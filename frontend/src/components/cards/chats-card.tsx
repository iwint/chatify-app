import Swipeable, {
    SwipeableRightActionProps
} from '@components/common/swipable';
import { Chat } from '@models/chats';
import { useTheme } from '@react-navigation/native';
import { ThemeProps } from '@utils/theme';
import { format } from 'date-fns';
import React from 'react';
import {
    Image,
    StyleSheet,
    Text,
    TouchableHighlight,
    useColorScheme,
    View
} from 'react-native';

interface ChatsCardProps extends Chat {
    onPress: () => void;
}

const ChatsCard: React.FC<ChatsCardProps> = ({
    date,
    from,
    id,
    img,
    msg,
    read,
    unreadCount,
    onPress
}) => {
    //@ts-ignore
    const theme: ThemeProps = useTheme();
    const styles = makeStyles(theme);
    const scheme = useColorScheme();

    const swipeableActions: Array<SwipeableRightActionProps> = [
        {
            color: '#C8C7CD',
            onPressAction: () => {},
            title: 'More',
            width: 200,
            icon: 'ellipsis-horizontal-outline'
        },
        {
            color: theme.colors.muted,
            onPressAction: () => {},
            title: 'Archive',
            width: 200,
            icon: 'archive'
        }
    ];

    return (
        <Swipeable actions={swipeableActions}>
            <TouchableHighlight
                key={id}
                style={styles.container}
                onPress={onPress}
                activeOpacity={0.6}
                underlayColor={
                    theme.dark ? theme.colors.gray : theme.colors.lightGray
                }
            >
                <View style={styles.content}>
                    <Image source={{ uri: img }} style={styles.avatar} />
                    <View style={{ flex: 1 }}>
                        <Text style={styles.title}>{from}</Text>
                        <Text
                            style={{
                                fontSize: 14,
                                color: theme.dark
                                    ? theme.colors.lightGray
                                    : theme.colors.gray
                            }}
                            numberOfLines={1}
                        >
                            {msg}
                        </Text>
                    </View>
                    <Text
                        style={[
                            styles.date,
                            {
                                color: theme.dark
                                    ? theme.colors.lightGray
                                    : theme.colors.gray
                            }
                        ]}
                    >
                        {format(date, 'dd.MM.yy')}
                    </Text>
                </View>
            </TouchableHighlight>
        </Swipeable>
    );
};

export default ChatsCard;

const makeStyles = (theme: ThemeProps) =>
    StyleSheet.create({
        container: {
            padding: 10
        },
        avatar: {
            width: theme.getResponsive(50, 'width'),
            height: theme.getResponsive(50, 'height'),
            borderRadius: 50
        },
        title: {
            fontWeight: '500',
            fontSize: 16,
            color: theme.colors.text
        },
        date: {
            fontSize: 12,
            alignSelf: 'flex-start'
        },
        content: {
            flexDirection: 'row',
            alignItems: 'center',
            gap: 10
        }
    });
