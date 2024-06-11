import { useTheme } from '@react-navigation/native';
import { ThemeProps } from '@utils/theme';
import { Text } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import Animated, {
    useAnimatedStyle,
    withTiming
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface AnimatedHeaderProps {
    derivedValues: any;
}

const HEADER_HEIGHT = 100;

const AnimatedHeader: React.FC<AnimatedHeaderProps> = ({ derivedValues }) => {
    const insets = useSafeAreaInsets();
    //@ts-ignore
    const theme: ThemeProps = useTheme();
    // const headerHeight = animatedValue.interpolate({
    //     inputRange: [0, HEADER_HEIGHT + insets.top],
    //     outputRange: [HEADER_HEIGHT + insets.top, insets.top + 50],
    //     extrapolate: 'clamp'
    // });

    // const fontSize = animatedValue.interpolate({
    //     inputRange: [0, 18 + 5],
    //     outputRange: [18 + 5, 5 + 5]
    // });

    const animatedHeaderTextSize = useAnimatedStyle(() => ({
        fontSize: withTiming(derivedValues.fontSize.value)
    }));
    const animatedHeaderHeight = useAnimatedStyle(() => ({
        height: withTiming(derivedValues.height.value)
    }));

    return (
        <Animated.View
            style={[
                {
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    zIndex: 10,
                    backgroundColor: theme.colors.background,
                    justifyContent: 'center',
                    padding: 20
                },
                animatedHeaderHeight
            ]}
        >
            <Animated.Text
                style={[
                    {
                        color: theme.colors.text,
                        fontFamily: 'bold'
                    },
                    animatedHeaderTextSize
                ]}
            >
                Settings
            </Animated.Text>
            <TextInput
                style={{
                    display: 'none',
                    backgroundColor: theme.colors.gray
                }}
            />
        </Animated.View>
    );
};

export default AnimatedHeader;
