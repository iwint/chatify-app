import CallsCard from '@components/cards/calls-card';
import SegementedControl from '@components/common/segmented-control';
import ListBlock from '@components/sections/list-block';
import MainLayout, { HeaderOptions } from '@layouts/main-layout';
import { useTheme } from '@react-navigation/native';
import { ThemeProps } from '@utils/theme';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useDerivedValue, useSharedValue } from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/Ionicons';
import CALLS_DATA from '@assets/data/calls.json';

interface CallsProps {}

const Calls: React.FC<CallsProps> = ({}) => {
    //@ts-ignore
    const theme: ThemeProps = useTheme();
    const styles = makeStyles(theme);
    const [isEditing, setIsEditing] = useState(false);
    const [selectedOption, setSelectedOption] = useState('All');
    const [filteredData, setFilteredData] = useState<Array<any>>(CALLS_DATA);

    const editing = useSharedValue(-32);

    const toggleIsEditing = () => {
        editing.value = isEditing ? 0 : -32;
        setIsEditing(!isEditing);
    };

    const derivedEditingValues = useDerivedValue(
        () => editing.value,
        [editing.value, isEditing]
    );

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
                    <CallsCard
                        isEditing={isEditing}
                        data={item}
                        index={index}
                        editingValue={derivedEditingValues.value}
                        onDelete={handleDeleteCall}
                    />
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
        }
    });
