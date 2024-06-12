import { useTheme } from '@react-navigation/native';
import { ThemeProps } from '@utils/theme';
import { StyleSheet, Text } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import Animated, {
    useAnimatedStyle,
    withTiming
} from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/Ionicons';

interface AnimatedHeaderProps {
    derivedValues: any;
    headerTitle: string;
    headerLeft?: React.ReactNode;
    headerRight?: React.ReactNode;
}

const AnimatedHeader: React.FC<AnimatedHeaderProps> = ({
    derivedValues,
    headerTitle,
    headerLeft,
    headerRight
}) => {
    //@ts-ignore
    const theme: ThemeProps = useTheme();
    const styles = makeStyles(theme);

    const animatedHeaderTextSize = useAnimatedStyle(() => {
        return {
            fontSize: withTiming(derivedValues.fontSize.value)
        };
    });
    const animatedHeaderHeight = useAnimatedStyle(() => ({
        height: withTiming(derivedValues.height.value),
        alignItems: derivedValues.textAlign.value
    }));

    const animatedLargeHeaderTitle = useAnimatedStyle(() => ({
        display: derivedValues.textAlign.value === 'center' ? 'none' : 'flex'
    }));
    const animatedSmallTitle = useAnimatedStyle(() => ({
        display: derivedValues.textAlign.value === 'center' ? 'flex' : 'none'
    }));

    const animatedHeaderSearchDisplay = useAnimatedStyle(() => ({
        display: derivedValues.display.value
    }));

    return (
        <Animated.View style={[styles.container, animatedHeaderHeight]}>
            <Animated.View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    width: '100%',
                    justifyContent: 'space-between'
                }}
            >
                <Animated.View>{headerLeft}</Animated.View>
                <Animated.Text
                    style={[
                        styles.text,
                        animatedHeaderTextSize,
                        animatedSmallTitle
                    ]}
                >
                    {headerTitle}
                </Animated.Text>
                <Animated.View>{headerRight}</Animated.View>
            </Animated.View>

            <Animated.Text
                style={[
                    styles.text,
                    animatedHeaderTextSize,
                    animatedLargeHeaderTitle
                ]}
            >
                {headerTitle}
            </Animated.Text>
            <Animated.View
                style={[styles.textInputWrapper, animatedHeaderSearchDisplay]}
            >
                <Icon
                    name="search-outline"
                    size={18}
                    color={theme.colors.text}
                />
                <TextInput
                    placeholder="Search"
                    placeholderTextColor={theme.colors.lightGray}
                    clearButtonMode={'always'}
                    activeCursor={'cell'}
                    cursorColor={theme.colors.primary}
                    inputMode={'search'}
                    style={[{ width: '100%', color: theme.colors.text }]}
                />
            </Animated.View>
        </Animated.View>
    );
};

const makeStyles = (theme: ThemeProps) =>
    StyleSheet.create({
        container: {
            top: 0,
            left: 0,
            right: 0,
            zIndex: 10,
            backgroundColor: theme.colors.background,
            justifyContent: 'center',
            padding: 20,
            gap: 10
        },
        textInputWrapper: {
            backgroundColor: theme.colors.gray,
            width: '100%',
            borderRadius: 10,
            height: 40,
            paddingLeft: 10,
            flexDirection: 'row',
            gap: 10,
            alignItems: 'center'
        },
        text: {
            color: theme.colors.text,
            fontFamily: 'bold'
        }
    });

export default AnimatedHeader;
