import { useCallback, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import OutsidePressHandler from 'react-native-outside-press';
import { ScrollView } from 'react-native-gesture-handler';
import { useTheme } from '@react-navigation/native';
import { ThemeProps } from '@utils/theme';
import Icon from 'react-native-vector-icons/Ionicons';

interface SelectProps {
    value: any;
    options: Array<any>;
    onChange: (value: string) => void;
}

const Select: React.FC<SelectProps> = ({ onChange, options, value }) => {
    const theme = useTheme();
    const styles = makeStyles(theme as unknown as ThemeProps);
    const [open, setOpen] = useState(false);

    const toggleOpen = useCallback(() => {
        setOpen(!open);
    }, [open]);

    const handleSelect = (value: string) => {
        onChange(value);
        setOpen(false);
    };

    return (
        <View style={styles.container}>
            <OutsidePressHandler onOutsidePress={() => setOpen(false)}>
                <Pressable style={styles.select} onPress={toggleOpen}>
                    <Text style={styles.selectedValue}>{value}</Text>
                    <Icon
                        name="chevron-down-outline"
                        color={'#000'}
                        size={18}
                    />
                </Pressable>
                {open && (
                    <ScrollView
                        snapToEnd
                        scrollEnabled
                        style={styles.optionsWrapper}
                    >
                        {options.map((option, index) => (
                            <Pressable
                                key={index}
                                style={styles.listItem}
                                onPress={() => handleSelect(option.value)}
                            >
                                <Text style={styles.name}>{option.value}</Text>
                            </Pressable>
                        ))}
                    </ScrollView>
                )}
            </OutsidePressHandler>
        </View>
    );
};

export default Select;

const makeStyles = (theme: ThemeProps) =>
    StyleSheet.create({
        container: {
            position: 'relative',
            zIndex: 5
        },
        optionsWrapper: {
            position: 'absolute',
            zIndex: 1,
            top: theme.getResponsive(60, 'height'),
            backgroundColor: '#fff',
            borderRadius: 10,
            elevation: 2,
            width: '100%',
            paddingHorizontal: 10,
            height: theme.getResponsive(200, 'height')
        },
        name: {
            fontSize: 16,
            color: '#000'
        },
        description: {
            fontSize: 14,
            color: theme.colors.muted
        },
        horizontalRule: {
            width: '100%',
            height: 1,
            backgroundColor: theme.colors.gray
        },
        select: {
            width: '100%',
            padding: 6,
            height: theme.getResponsive(50, 'height'),
            backgroundColor: '#fff',
            borderRadius: 10,
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: 10,
            alignItems: 'center'
        },
        selectedValue: {
            color: '#000',
            textTransform: 'capitalize'
        },
        listItem: {
            borderBottomWidth: 1,
            borderBottomColor: theme.colors.gray,
            paddingHorizontal: 5,
            paddingVertical: theme.getResponsive(15, 'width')
        }
    });
