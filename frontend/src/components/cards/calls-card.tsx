import Swipeable, {
    SwipeableRightActionProps
} from '@components/common/swipable';
import { defaultStyles } from '@constants/styles';
import { Call } from '@models/calls';
import { useTheme } from '@react-navigation/native';
import { ThemeProps } from '@utils/theme';
import { format } from 'date-fns';
import React from 'react';
import {
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    useColorScheme,
    View
} from 'react-native';
import Animated, {
    FadeInUp,
    FadeOutDown,
    useAnimatedStyle,
    withTiming
} from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/Ionicons';

interface CallsCardProps {
    onDelete: (item: Call) => void;
    data: Call;
    index: number;
    editingValue: number;
    isEditing: boolean;
}

const AnimatedTouchableOpacity =
    Animated.createAnimatedComponent(TouchableOpacity);

const CallsCard: React.FC<CallsCardProps> = ({
    data,
    onDelete,
    index,
    editingValue,
    isEditing
}) => {
    //@ts-ignore
    const theme: ThemeProps = useTheme();
    const styles = makeStyles(theme);
    const scheme = useColorScheme();
    const animatedRowStyle = useAnimatedStyle(() => ({
        transform: [{ translateX: withTiming(editingValue) }]
    }));
    const swipeableAction: SwipeableRightActionProps = {
        color: '#dd2c00',
        onPressAction: () => onDelete(data),
        title: 'Delete',
        width: 200
    };
    return (
        <Swipeable actions={[swipeableAction]}>
            <Animated.View
                entering={FadeInUp.delay(index * 10)}
                exiting={FadeOutDown}
                style={styles.container}
            >
                <AnimatedTouchableOpacity
                    onPress={() => onDelete(data)}
                    style={[animatedRowStyle]}
                >
                    <Icon
                        name="remove-circle"
                        color={theme.colors.red}
                        size={24}
                    />
                </AnimatedTouchableOpacity>
                <Animated.View style={[defaultStyles.item, animatedRowStyle]}>
                    <Image source={{ uri: data.img }} style={styles.avatar} />
                    <View style={{ flex: 1, gap: 2 }}>
                        <Text
                            style={{
                                fontSize: theme.getResponsive(16, 'width'),
                                color: data.missed
                                    ? theme.colors.red
                                    : theme.colors.text
                            }}
                        >
                            {data.name}
                        </Text>
                        <View style={{ ...styles.bottomSection, gap: 4 }}>
                            <Icon
                                color={
                                    scheme === 'dark'
                                        ? theme.colors.text
                                        : theme.colors.gray
                                }
                                name={data.video ? 'videocam' : 'call'}
                            />
                            <Text
                                style={{
                                    color:
                                        scheme === 'dark'
                                            ? theme.colors.text
                                            : theme.colors.gray,
                                    fontSize: theme.getResponsive(12, 'height'),
                                    flex: 1
                                }}
                            >
                                {data.incoming ? 'Incoming' : 'Outgoing'}
                            </Text>
                        </View>
                    </View>
                    <View
                        style={{
                            gap: 6,
                            ...styles.bottomSection
                        }}
                    >
                        <Text
                            style={{
                                color:
                                    scheme === 'dark'
                                        ? theme.colors.text
                                        : theme.colors.gray,
                                fontSize: theme.getResponsive(12, 'height')
                            }}
                        >
                            {format(data.date, 'MM.dd.yy')}
                        </Text>
                        <Icon
                            name="information-circle-outline"
                            size={24}
                            color={theme.colors.primary}
                        />
                    </View>
                </Animated.View>
            </Animated.View>
        </Swipeable>
    );
};

export default CallsCard;

const makeStyles = (theme: ThemeProps) =>
    StyleSheet.create({
        container: {
            flexDirection: 'row',
            alignItems: 'center',
            paddingLeft: 10
        },
        avatar: {
            width: theme.getResponsive(40, 'width'),
            height: theme.getResponsive(40, 'height'),
            borderRadius: 40
        },
        bottomSection: {
            flexDirection: 'row',
            alignItems: 'center'
        }
    });
