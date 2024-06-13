import { useTheme } from '@react-navigation/native';
import { ThemeProps } from '@utils/theme';
import React from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    useColorScheme,
    useWindowDimensions,
    View
} from 'react-native';
import Animated, {
    useAnimatedStyle,
    withTiming
} from 'react-native-reanimated';

interface SegementedControlProps {
    options: Array<string>;
    selectedOption: string;
    onPressOption: (option: string) => void;
}

const SegementedControl: React.FC<SegementedControlProps> = React.memo(
    ({ onPressOption, options, selectedOption }) => {
        //@ts-ignore
        const theme: ThemeProps = useTheme();
        const styles = makeStyles(theme);
        const { width: windowWidth } = useWindowDimensions();
        const internalPadding = 10;
        const segmentedWidth = windowWidth - 220;
        const scheme = useColorScheme();

        const itemWidth = (segmentedWidth - internalPadding) / options.length;

        const reanimatedStyle = useAnimatedStyle(() => {
            const index = options.indexOf(selectedOption);

            return {
                left: withTiming(itemWidth * index + internalPadding / 2)
            };
        }, [selectedOption, itemWidth, options]);

        return (
            <View
                style={[
                    styles.container,
                    {
                        width: segmentedWidth,
                        borderRadius: 6,
                        paddingHorizontal: internalPadding,
                        backgroundColor: theme.colors.lightGray
                    }
                ]}
            >
                <Animated.View
                    style={[
                        {
                            width: itemWidth
                        },
                        styles.selectOptionOverLay,
                        reanimatedStyle
                    ]}
                />
                {options.map((option, index) => (
                    <TouchableOpacity
                        onPress={() => onPressOption(option)}
                        key={index}
                        style={[
                            {
                                width: itemWidth
                            },
                            styles.optionContainer
                        ]}
                    >
                        <Text style={styles.option}>{option}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        );
    }
);

export default SegementedControl;

const makeStyles = (theme: ThemeProps) =>
    StyleSheet.create({
        container: {
            flexDirection: 'row',
            height: theme.getResponsive(36, 'height')
        },
        selectOptionOverLay: {
            position: 'absolute',
            height: '80%',
            top: '10%',
            backgroundColor: theme.colors.white,
            shadowColor: theme.colors.black,
            shadowOffset: {
                width: 0,
                height: 0
            },
            borderRadius: 6,
            shadowOpacity: 0.1,
            elevation: 3,
            zIndex: -1
        },
        optionContainer: {
            justifyContent: 'center',
            alignItems: 'center'
        },
        option: {
            fontSize: theme.getResponsive(14, 'width'),
            color: theme.colors.black
        }
    });
