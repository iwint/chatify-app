import Button from '@components/buttons/button';
import SettingCard from '@components/cards/settings-card';
import AnimatedHeader from '@components/common/animated-header';
import { devices, items, support } from '@constants/settings-data';
import { defaultStyles } from '@constants/styles';
import { useNavigation, useTheme } from '@react-navigation/native';
import { ThemeProps } from '@utils/theme';
import React, { useEffect, useRef } from 'react';
import {
    FlatList,
    ScrollView,
    StyleSheet,
    useColorScheme,
    View
} from 'react-native';
import Animated, {
    useAnimatedScrollHandler,
    useDerivedValue,
    useSharedValue
} from 'react-native-reanimated';

import SafeAreaView from 'react-native-safe-area-view';

interface SettingsProps {}

const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView);

const Settings: React.FC<SettingsProps> = ({}) => {
    //@ts-ignore
    const theme: ThemeProps = useTheme();
    const scrollViewRef = useRef(null);
    const navigation = useNavigation();
    const headerFontSize = useSharedValue<number>(20);
    const headerHeight = useSharedValue<number>(200);
    const scrollOffset = useSharedValue(0);
    const derivedHeaderFontSize = useDerivedValue(
        () => headerFontSize.value,
        [headerFontSize.value]
    );
    const derivedHeaderHeight = useDerivedValue(
        () => headerHeight.value,
        [headerHeight.value]
    );

    const scrollHandler = useAnimatedScrollHandler({
        onScroll: (event) => {
            const scrollY = event.contentOffset.y;
            const animatedStartOffset = 20;
            scrollOffset.value = 26;
            if (scrollY > animatedStartOffset) {
                headerHeight.value = 70;
                headerFontSize.value = 18;
            } else {
                headerFontSize.value = 26;

                headerHeight.value = 100;
            }
        }
    });
    const styles = makeStyles(theme);
    const scheme = useColorScheme();

    useEffect(() => {
        navigation.setOptions({
            headerShown: false
        });
    }, []);

    return (
        <SafeAreaView forceInset={{ top: 'always' }} style={styles.container}>
            <AnimatedHeader
                derivedValues={{
                    height: derivedHeaderHeight,
                    fontSize: derivedHeaderFontSize
                }}
            />
            <AnimatedScrollView
                ref={scrollViewRef}
                style={{ flex: 1 }}
                contentContainerStyle={{
                    paddingTop: 100,
                    paddingHorizontal: 10
                }}
                showsHorizontalScrollIndicator={false}
                scrollEventThrottle={16}
                onScroll={scrollHandler}
            >
                <View style={{ height: theme.dimension.height }}>
                    <View
                        style={[
                            defaultStyles.block,
                            {
                                backgroundColor:
                                    scheme === 'dark'
                                        ? theme.colors.gray
                                        : theme.colors.white
                            }
                        ]}
                    >
                        <FlatList
                            scrollEnabled={false}
                            data={devices}
                            ItemSeparatorComponent={() => (
                                <View style={defaultStyles.separator} />
                            )}
                            renderItem={({ item }) => (
                                <SettingCard item={item} onPress={() => {}} />
                            )}
                        />
                    </View>

                    <View
                        style={[
                            defaultStyles.block,
                            {
                                backgroundColor:
                                    scheme === 'dark'
                                        ? theme.colors.gray
                                        : theme.colors.white
                            }
                        ]}
                    >
                        <FlatList
                            scrollEnabled={false}
                            data={items}
                            ItemSeparatorComponent={() => (
                                <View style={defaultStyles.separator} />
                            )}
                            renderItem={({ item }) => (
                                <SettingCard item={item} onPress={() => {}} />
                            )}
                        />
                    </View>

                    <View
                        style={[
                            defaultStyles.block,
                            {
                                backgroundColor:
                                    scheme === 'dark'
                                        ? theme.colors.gray
                                        : theme.colors.white
                            }
                        ]}
                    >
                        <FlatList
                            scrollEnabled={false}
                            data={support}
                            ItemSeparatorComponent={() => (
                                <View style={defaultStyles.separator} />
                            )}
                            renderItem={({ item }) => (
                                <SettingCard item={item} onPress={() => {}} />
                            )}
                        />
                    </View>

                    <Button
                        size="large"
                        title="Log Out"
                        backgroundColor={theme.colors.background}
                        textColor={theme.colors.primary}
                        style={{ paddingVertical: 15 }}
                    />
                </View>
            </AnimatedScrollView>
        </SafeAreaView>
    );
};

export default Settings;

const makeStyles = (theme: ThemeProps) =>
    StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: theme.colors.background,
            height: '100%'
        }
    });
