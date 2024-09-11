import Input from '@components/inputs';
import { HeaderOptions } from '@layouts/main-layout';
import { useNavigation, useRoute, useTheme } from '@react-navigation/native';
import { ThemeProps } from '@utils/theme';
import { StyleSheet, TouchableOpacity } from 'react-native';
import Animated, {
    useAnimatedStyle,
    withTiming,
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
    headerStyle,
    searchOptions,
    headerLargeTitle,
}) => {
    //@ts-ignore
    const theme: ThemeProps = useTheme();
    const styles = makeStyles(theme);
    const route = useRoute();
    const navigation = useNavigation();

    const handleGoBack = () => {
        navigation.goBack();
    };

    const animatedHeaderTextSize = useAnimatedStyle(() => {
        return {
            fontSize: headerLargeTitle
                ? withTiming(derivedValues?.fontSize.value || 14)
                : 18,
        };
    });
    const animatedHeaderHeight = useAnimatedStyle(() => ({
        height: headerLargeTitle ? withTiming(derivedValues.height.value) : 80,
        alignItems: derivedValues.textAlign.value,
    }));

    const animatedLargeHeaderTitle = useAnimatedStyle(() => ({
        display: derivedValues.textAlign.value === 'center' ? 'none' : 'flex',
    }));
    const animatedSmallTitle = useAnimatedStyle(() => ({
        display: headerLargeTitle
            ? derivedValues.textAlign.value === 'center'
                ? 'flex'
                : 'none'
            : 'flex',
    }));

    const animatedHeaderSearchDisplay = useAnimatedStyle(() => ({
        display: derivedValues.display.value,
    }));

    const animatedHeaderTitleComponent = useAnimatedStyle(() => {
        return {
            display: headerLargeTitle
                ? derivedValues.textAlign.value === 'center'
                    ? 'none'
                    : 'flex'
                : 'flex',
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
                    ...headerStyle,
                },
            ]}
        >
            <Animated.View style={styles.topSectionWrapper}>
                <Animated.View>
                    {headerLeft ? (
                        headerLeft
                    ) : (
                        <TouchableOpacity onPress={handleGoBack}>
                            <Icon
                                name="chevron-back-outline"
                                size={theme.getResponsive(30, 'width')}
                                color={theme.colors.primary}
                            />
                        </TouchableOpacity>
                    )}
                </Animated.View>
                {headerTitle ? (
                    typeof headerTitle === 'string' ? (
                        <Animated.Text
                            style={[
                                styles.text,
                                animatedHeaderTextSize,
                                animatedSmallTitle,
                            ]}
                        >
                            {headerTitle}
                        </Animated.Text>
                    ) : (
                        <>
                            {headerLargeTitle ? (
                                <>
                                    <Animated.View
                                        style={animatedHeaderTitleComponent}
                                    >
                                        {headerTitle}
                                    </Animated.View>
                                    <Animated.Text
                                        style={[
                                            styles.text,
                                            animatedHeaderTextSize,
                                            animatedSmallTitle,
                                        ]}
                                    >
                                        {route.name}
                                    </Animated.Text>
                                </>
                            ) : (
                                headerTitle
                            )}
                        </>
                    )
                ) : (
                    <Animated.Text
                        style={[
                            styles.text,
                            animatedHeaderTextSize,
                            animatedSmallTitle,
                        ]}
                    >
                        {route.name}
                    </Animated.Text>
                )}

                <Animated.View>{headerRight}</Animated.View>
            </Animated.View>
            {headerLargeTitle && (
                <Animated.Text
                    style={[
                        styles.text,
                        animatedHeaderTextSize,
                        animatedLargeHeaderTitle,
                    ]}
                >
                    {route.name}
                </Animated.Text>
            )}
            {searchOptions && <Input style={animatedHeaderSearchDisplay} />}
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
            gap: 10,
        },

        text: {
            color: theme.colors.text,
            fontFamily: 'bold',
        },
        topSectionWrapper: {
            flexDirection: 'row',
            alignItems: 'center',
            width: '100%',
            justifyContent: 'space-between',
        },
    });

export default AnimatedHeader;
