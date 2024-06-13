import Button from '@components/buttons/button';
import SettingCard from '@components/cards/settings-card';
import ListBlock from '@components/sections/list-block';
import { devices, items, support } from '@constants/settings-data';
import { defaultStyles } from '@constants/styles';
import MainLayout from '@layouts/main-layout';
import { useNavigation, useTheme } from '@react-navigation/native';
import { ThemeProps } from '@utils/theme';
import React, { useEffect } from 'react';
import { FlatList, StyleSheet, useColorScheme, View } from 'react-native';

interface SettingsProps {}

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
            <ListBlock
                data={devices}
                renderComponent={(item) => (
                    <SettingCard item={item} onPress={() => {}} />
                )}
            />
            <ListBlock
                data={items}
                renderComponent={(item) => (
                    <SettingCard item={item} onPress={() => {}} />
                )}
            />
            <ListBlock
                data={support}
                renderComponent={(item) => (
                    <SettingCard item={item} onPress={() => {}} />
                )}
            />

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
