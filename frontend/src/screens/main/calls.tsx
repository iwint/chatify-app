import { CALLS_DATA } from '@assets/data/calls';
import SegementedControl from '@components/common/segmented-control';
import Swipeable from '@components/common/swipable';
import ListBlock from '@components/sections/list-block';
import { defaultStyles } from '@constants/styles';
import MainLayout, { HeaderOptions } from '@layouts/main-layout';
import { useTheme } from '@react-navigation/native';
import { ThemeProps } from '@utils/theme';
import { format } from 'date-fns';
import React, { useEffect, useState } from 'react';
import { Image, useColorScheme } from 'react-native';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Animated, { FadeInUp, FadeOutDown } from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/Ionicons';

interface CallsProps {}

const Calls: React.FC<CallsProps> = ({}) => {
    //@ts-ignore
    const theme: ThemeProps = useTheme();
    const styles = makeStyles(theme);
    const [isEditing, setIsEditing] = useState(false);
    const scheme = useColorScheme();
    const [selectedOption, setSelectedOption] = useState('All');
    const [filteredData, setFilteredData] = useState<Array<any>>(CALLS_DATA);
    const toggleIsEditing = () => {
        setIsEditing((p) => !p);
    };

    const headerOptions: HeaderOptions = {
        headerLeft: (
            <TouchableOpacity onPress={toggleIsEditing}>
                <Text style={styles.headerLeftButton}>
                    {isEditing ? 'Done' : 'Edit'}
                </Text>
            </TouchableOpacity>
        ),
        headerTitle: (
            <SegementedControl
                options={['All', 'Missed']}
                selectedOption={selectedOption}
                onPressOption={setSelectedOption}
            />
        ),
        headerRight: (
            <TouchableOpacity>
                <Icon
                    name="call-outline"
                    size={theme.getResponsive(24, 'width')}
                    color={theme.colors.primary}
                />
            </TouchableOpacity>
        )
    };

    useEffect(() => {
        if (selectedOption === 'Missed') {
            setFilteredData(CALLS_DATA.filter((call) => call.missed === true));
        } else {
            setFilteredData(CALLS_DATA);
        }
    }, [selectedOption]);

    const handleDeleteCall = (item: any) => {
        console.log(item);

        let calls = [...filteredData];
        calls = calls.filter((i) => i.id != item.id);
        console.log(JSON.stringify(calls, null, 2));

        setFilteredData(calls);
    };

    return (
        <MainLayout headerOptions={headerOptions}>
            <ListBlock
                data={filteredData}
                renderComponent={(item, index) => (
                    <Swipeable onDelete={() => handleDeleteCall(item)}>
                        <Animated.View
                            entering={FadeInUp.delay(index * 10)}
                            exiting={FadeOutDown}
                        >
                            <View style={[defaultStyles.item]}>
                                <Image
                                    source={{ uri: item.img }}
                                    style={styles.avatar}
                                />
                                <View style={{ flex: 1, gap: 2 }}>
                                    <Text
                                        style={{
                                            fontSize: theme.getResponsive(
                                                16,
                                                'width'
                                            ),
                                            color: item.missed
                                                ? theme.colors.red
                                                : theme.colors.text
                                        }}
                                    >
                                        {item.name}
                                    </Text>
                                    <View
                                        style={{
                                            flexDirection: 'row',
                                            gap: 4,
                                            alignItems: 'center'
                                        }}
                                    >
                                        <Icon
                                            color={
                                                scheme === 'dark'
                                                    ? theme.colors.text
                                                    : theme.colors.gray
                                            }
                                            name={
                                                item.video ? 'videocam' : 'call'
                                            }
                                        />
                                        <Text
                                            style={{
                                                color:
                                                    scheme === 'dark'
                                                        ? theme.colors.text
                                                        : theme.colors.gray,
                                                fontSize: theme.getResponsive(
                                                    12,
                                                    'height'
                                                ),
                                                flex: 1
                                            }}
                                        >
                                            {item.incoming
                                                ? 'Incoming'
                                                : 'Outgoing'}
                                        </Text>
                                    </View>
                                </View>
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        gap: 6,
                                        alignItems: 'center'
                                    }}
                                >
                                    <Text
                                        style={{
                                            color:
                                                scheme === 'dark'
                                                    ? theme.colors.text
                                                    : theme.colors.gray,
                                            fontSize: theme.getResponsive(
                                                12,
                                                'height'
                                            )
                                        }}
                                    >
                                        {format(item.date, 'MM.dd.yy')}
                                    </Text>
                                    <Icon
                                        name="information-circle-outline"
                                        size={24}
                                        color={theme.colors.primary}
                                    />
                                </View>
                            </View>
                        </Animated.View>
                    </Swipeable>
                )}
            />
        </MainLayout>
    );
};

export default Calls;

const makeStyles = (theme: ThemeProps) =>
    StyleSheet.create({
        container: {
            flex: 1,
            padding: 20,
            justifyContent: 'center',
            alignItems: 'center'
        },
        headerLeftButton: {
            color: theme.colors.primary,
            fontSize: theme.getResponsive(18, 'width')
        },
        avatar: {
            width: theme.getResponsive(40, 'width'),
            height: theme.getResponsive(40, 'height'),
            borderRadius: 40
        }
    });
