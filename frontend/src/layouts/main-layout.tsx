import AnimatedHeader from '@components/common/animated-header';
import { useNavigation, useTheme } from '@react-navigation/native';
import { ThemeProps } from '@utils/theme';
import React, { useEffect, useRef } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import Animated, {
    useAnimatedScrollHandler,
    useDerivedValue,
    useSharedValue
} from 'react-native-reanimated';
import SafeAreaView from 'react-native-safe-area-view';

export interface HeaderOptions {
    headerTitle?: string | React.ReactNode;
    headerLeft?: React.ReactNode;
    headerRight?: React.ReactNode;
}

interface MainLayoutProps {
    children: React.ReactNode;
    headerOptions?: HeaderOptions;
}

const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView);

const MainLayout: React.FC<MainLayoutProps> = ({ children, headerOptions }) => {
    //@ts-ignore
    const theme: ThemeProps = useTheme();
    const scrollViewRef = useRef(null);
    const navigation = useNavigation();
    const headerFontSize = useSharedValue<number>(26);
    const headerHeight = useSharedValue<number>(100);
    const headerSearchDisplay = useSharedValue<string>('none');
    const headerTextAlign = useSharedValue<string>('left');
    const scrollOffset = useSharedValue(0);
    const derivedHeaderFontSize = useDerivedValue(
        () => headerFontSize.value,
        [headerFontSize.value]
    );

    const derivedHeaderTextAlign = useDerivedValue(
        () => headerTextAlign.value,
        [headerFontSize.value]
    );
    const derivedHeaderHeight = useDerivedValue(
        () => headerHeight.value,
        [headerHeight.value]
    );
    const derivedHeaderSearchDisplay = useDerivedValue(
        () => headerSearchDisplay.value,
        [headerSearchDisplay.value]
    );

    const scrollHandler = useAnimatedScrollHandler({
        onScroll: (event) => {
            const scrollY = event.contentOffset.y;
            const animatedStartOffset = 20;
            const animatedEndOffset = 70;
            scrollOffset.value = 26;
            console.log(scrollY);

            if (scrollY > animatedStartOffset && scrollY < animatedEndOffset) {
                headerHeight.value = 100;
                headerSearchDisplay.value = 'none';
            } else if (scrollY > animatedEndOffset) {
                headerHeight.value = 70;
                headerFontSize.value = 18;
                headerTextAlign.value = 'center';
            } else {
                headerFontSize.value = 26;
                headerSearchDisplay.value = 'flex';
                headerHeight.value = 150;
                headerTextAlign.value = 'flex-start';
            }
        }
    });
    const styles = makeStyles(theme);
    useEffect(() => {
        navigation.setOptions({
            headerShown: false
        });
    }, []);
    return (
        <SafeAreaView forceInset={{ top: 'always' }} style={styles.container}>
            <AnimatedHeader
                headerTitle={headerOptions?.headerTitle}
                headerLeft={headerOptions?.headerLeft}
                headerRight={headerOptions?.headerRight}
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
                style={{ flex: 1 }}
                contentContainerStyle={styles.contentContainer}
                showsHorizontalScrollIndicator={false}
                scrollEventThrottle={16}
                onScroll={scrollHandler}
            >
                <View style={{ height: theme.dimension.height }}>
                    {children}
                </View>
            </AnimatedScrollView>
        </SafeAreaView>
    );
};

export default MainLayout;

const makeStyles = (theme: ThemeProps) =>
    StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: theme.colors.background,
            height: '100%'
        },
        contentContainer: {
            paddingVertical: 10,
            paddingBottom: 15,
            paddingHorizontal: 10
        }
    });
