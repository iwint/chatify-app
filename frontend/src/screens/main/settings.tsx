import Button from '@components/buttons/button';
import SettingCard from '@components/cards/settings-card';
import AnimatedHeader from '@components/common/animated-header';
import { devices, items, support } from '@constants/settings-data';
import { defaultStyles } from '@constants/styles';
import MainLayout from '@layouts/main-layout';
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
    const navigation = useNavigation();
    const scheme = useColorScheme();

    useEffect(() => {
        navigation.setOptions({
            headerShown: false
        });
    }, []);

    return (
        <MainLayout>
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
        </MainLayout>
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
