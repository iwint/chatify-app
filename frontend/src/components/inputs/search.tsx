import { useTheme } from '@react-navigation/native';
import { ThemeProps } from '@utils/theme';
import React from 'react';
import { StyleSheet, TextInputProps } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/Ionicons';

interface SearchInputProps extends TextInputProps {}

const SearchInput: React.FC<SearchInputProps> = ({
    onChangeText,
    value,
    style
}) => {
    //@ts-ignore
    const theme: ThemeProps = useTheme();
    const styles = makeStyles(theme);
    return (
        <Animated.View
            style={[
                styles.textInputWrapper,
                style,
                {
                    backgroundColor: theme.dark
                        ? theme.colors.gray
                        : theme.colors.lightGray
                }
            ]}
        >
            <Icon
                name="search-outline"
                size={18}
                color={theme.dark ? theme.colors.lightGray : theme.colors.gray}
            />
            <TextInput
                placeholder="Search"
                placeholderTextColor={
                    theme.dark ? theme.colors.lightGray : theme.colors.gray
                }
                onChangeText={onChangeText}
                value={value}
                clearButtonMode={'always'}
                activeCursor={'cell'}
                cursorColor={theme.colors.primary}
                inputMode={'search'}
                style={[{ width: '100%', color: theme.colors.text }]}
            />
        </Animated.View>
    );
};

export default SearchInput;

const makeStyles = (theme: ThemeProps) =>
    StyleSheet.create({
        textInputWrapper: {
            width: '100%',
            borderRadius: 10,
            height: 40,
            paddingLeft: 10,
            flexDirection: 'row',
            gap: 10,
            alignItems: 'center'
        }
    });
