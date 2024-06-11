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

const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

const AnimatedHeader: React.FC<AnimatedHeaderProps> = ({ derivedValues }) => {
    const insets = useSafeAreaInsets();
    //@ts-ignore
    const theme: ThemeProps = useTheme();

    const animatedHeaderTextSize = useAnimatedStyle(() => ({
        fontSize: withTiming(derivedValues.fontSize.value)
    }));
    const animatedHeaderHeight = useAnimatedStyle(() => ({
        height: withTiming(derivedValues.height.value)
    }));
    // const animatedHeaderSearchDisplay = useAnimatedStyle(() => ({
    //     display:
    //         withTiming(derivedValues.display.value).value === 0
    //             ? 'none'
    //             : 'flex',
    //     height: withTiming(derivedValues.display.value)
    // }));

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
            {/* <AnimatedTextInput
                style={[
                    {
                        backgroundColor: theme.colors.gray
                    },
                    animatedHeaderSearchDisplay
                ]}
            /> */}
        </Animated.View>
    );
};

export default AnimatedHeader;
