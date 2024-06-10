import Button from '@components/buttons/button';
import SettingCard from '@components/cards/settings-card';
import RoundedBoxIcon from '@components/common/rounded-box-icon';
import { devices, items, support } from '@constants/settings-data';
import { defaultStyles } from '@constants/styles';
import { useTheme } from '@react-navigation/native';
import { ThemeProps } from '@utils/theme';
import React from 'react';
import {
    FlatList,
    ScrollView,
    StyleSheet,
    Text,
    useColorScheme,
    View
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

interface SettingsProps {}

const Settings: React.FC<SettingsProps> = ({}) => {
    //@ts-ignore
    const theme: ThemeProps = useTheme();
    const styles = makeStyles(theme);
    const scheme = useColorScheme();
    return (
        <View style={styles.container}>
            <ScrollView>
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
            </ScrollView>
        </View>
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
