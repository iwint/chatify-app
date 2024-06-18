import SearchInput from '@components/inputs/search';
import { HeaderOptions } from '@layouts/main-layout';
import { useRoute, useTheme } from '@react-navigation/native';
import { ThemeProps } from '@utils/theme';
import { StyleSheet, useColorScheme } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import Animated, {
    useAnimatedStyle,
    withTiming
} from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/Ionicons';

interface AnimatedHeaderProps extends HeaderOptions {
    derivedValues: any;
}

const AnimatedHeader: React.FC<AnimatedHeaderProps> = ({
    derivedValues,
    headerTitle,
    headerLeft,
    headerRight,
    headerStyle
}) => {
    //@ts-ignore
    const theme: ThemeProps = useTheme();
    const styles = makeStyles(theme);
    const route = useRoute();

    const animatedHeaderTextSize = useAnimatedStyle(() => {
        return {
            fontSize: withTiming(derivedValues?.fontSize.value || 14)
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

    const animatedHeaderTitleComponent = useAnimatedStyle(() => {
        return {
            display:
                derivedValues.textAlign.value === 'center' ? 'none' : 'flex'
        };
    });

    return (
        <Animated.View
            style={[
                styles.container,
                animatedHeaderHeight,
                {
                    backgroundColor: headerStyle?.backgroundColor
                        ? headerStyle.backgroundColor
                        : theme.colors.background,
                    ...headerStyle
                }
            ]}
        >
            <Animated.View style={styles.topSectionWrapper}>
                <Animated.View>{headerLeft}</Animated.View>
                {headerTitle ? (
                    typeof headerTitle === 'string' ? (
                        <Animated.Text
                            style={[
                                styles.text,
                                animatedHeaderTextSize,
                                animatedSmallTitle
                            ]}
                        >
                            {headerTitle}
                        </Animated.Text>
                    ) : (
                        <>
                            <Animated.View style={animatedHeaderTitleComponent}>
                                {headerTitle}
                            </Animated.View>
                            <Animated.Text
                                style={[
                                    styles.text,
                                    animatedHeaderTextSize,
                                    animatedSmallTitle
                                ]}
                            >
                                {route.name}
                            </Animated.Text>
                        </>
                    )
                ) : (
                    <Animated.Text
                        style={[
                            styles.text,
                            animatedHeaderTextSize,
                            animatedSmallTitle
                        ]}
                    >
                        {route.name}
                    </Animated.Text>
                )}

                <Animated.View>{headerRight}</Animated.View>
            </Animated.View>

            <Animated.Text
                style={[
                    styles.text,
                    animatedHeaderTextSize,
                    animatedLargeHeaderTitle
                ]}
            >
                {route.name}
            </Animated.Text>
            <SearchInput style={animatedHeaderSearchDisplay} />
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
            justifyContent: 'center',
            padding: 20,
            gap: 10
        },

        text: {
            color: theme.colors.text,
            fontFamily: 'bold'
        },
        topSectionWrapper: {
            flexDirection: 'row',
            alignItems: 'center',
            width: '100%',
            justifyContent: 'space-between'
        }
    });

export default AnimatedHeader;
