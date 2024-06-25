import AnimatedHeader from '@components/common/animated-header';
import { useTheme } from '@react-navigation/native';
import { ThemeProps } from '@utils/theme';
import React, { useRef, useMemo } from 'react';
import {
    ScrollView,
    StyleSheet,
    TextInputProps,
    View,
    ViewStyle
} from 'react-native';
import Animated, {
    useAnimatedScrollHandler,
    useDerivedValue,
    useSharedValue
} from 'react-native-reanimated';
import SafeAreaView from 'react-native-safe-area-view';

export interface SearchOptions extends TextInputProps {}

export interface HeaderOptions {
    headerTitle?: string | React.ReactNode;
    headerLeft?: React.ReactNode;
    headerRight?: React.ReactNode;
    headerStyle?: ViewStyle;
    searchOptions?: SearchOptions;
    headerLargeTitle?: boolean;
}

interface MainLayoutProps {
    children: React.ReactNode;
    headerOptions?: HeaderOptions;
    layoutOptions?: {
        backgroundColor?: string;
        scrollDisabled?: boolean;
    };
}

const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView);

const MainLayout: React.FC<MainLayoutProps> = ({
    children,
    headerOptions,
    layoutOptions
}) => {
    //@ts-ignore
    const theme: ThemeProps = useTheme();
    const scrollViewRef = useRef(null);

    const headerFontSize = useSharedValue<number>(26);
    const headerHeight = useSharedValue<number>(100);
    const headerSearchDisplay = useSharedValue<string>('none');
    const headerTextAlign = useSharedValue<string>('left');
    const scrollOffset = useSharedValue(0);

    const derivedHeaderFontSize = useDerivedValue(() => headerFontSize.value);
    const derivedHeaderTextAlign = useDerivedValue(() => headerTextAlign.value);
    const derivedHeaderHeight = useDerivedValue(() => headerHeight.value);
    const derivedHeaderSearchDisplay = useDerivedValue(
        () => headerSearchDisplay.value
    );

    const scrollHandler = useAnimatedScrollHandler({
        onScroll: (event) => {
            const scrollY = event.contentOffset.y;
            const animatedStartOffset = 20;
            const animatedEndOffset = 70;

            scrollOffset.value = 26;

            if (scrollY > animatedStartOffset && scrollY < animatedEndOffset) {
                headerHeight.value = 100;
                headerSearchDisplay.value = 'none';
            } else if (scrollY > animatedEndOffset) {
                headerHeight.value = 70;
                headerFontSize.value = 18;
                headerTextAlign.value = 'center';
                headerSearchDisplay.value = 'none';
            } else {
                headerFontSize.value = 26;
                headerSearchDisplay.value = 'flex';
                headerHeight.value = 150;
                headerTextAlign.value = 'flex-start';
            }
        }
    });

    const styles = useMemo(() => makeStyles(theme), [theme]);

    const dynamicChildrenContainerStyle = useMemo(
        () => ({
            minHeight: layoutOptions?.scrollDisabled
                ? theme.dimension.height - 100
                : theme.dimension.height,
            gap: 20,
            flex: 1
        }),
        [layoutOptions?.scrollDisabled, theme.dimension.height]
    );

    return (
        <SafeAreaView
            forceInset={{ top: 'always' }}
            style={[
                styles.container,
                {
                    backgroundColor:
                        layoutOptions?.backgroundColor ||
                        theme.colors.background
                }
            ]}
        >
            <AnimatedHeader
                headerTitle={headerOptions?.headerTitle}
                headerLeft={headerOptions?.headerLeft}
                headerRight={headerOptions?.headerRight}
                headerStyle={headerOptions?.headerStyle}
                searchOptions={headerOptions?.searchOptions}
                headerLargeTitle={headerOptions?.headerLargeTitle}
                derivedValues={{
                    height: derivedHeaderHeight,
                    fontSize: derivedHeaderFontSize,
                    display: derivedHeaderSearchDisplay,
                    textAlign: derivedHeaderTextAlign
                }}
            />
            <AnimatedScrollView
                contentInsetAdjustmentBehavior={'automatic'}
                ref={scrollViewRef}
                style={styles.scrollView}
                contentContainerStyle={[
                    styles.contentContainer,
                    { paddingTop: headerOptions?.headerLargeTitle ? 40 : 0 }
                ]}
                showsHorizontalScrollIndicator={false}
                scrollEventThrottle={16}
                onScroll={scrollHandler}
            >
                <View style={dynamicChildrenContainerStyle}>{children}</View>
            </AnimatedScrollView>
        </SafeAreaView>
    );
};

const makeStyles = (theme: ThemeProps) =>
    StyleSheet.create({
        container: {
            flex: 1,
            height: '100%'
        },
        scrollView: {
            flex: 1
        },
        contentContainer: {
            paddingBottom: 15,
            paddingHorizontal: 5
        }
    });

export default MainLayout;
