import { useTheme } from '@react-navigation/native';
import { ThemeProps } from '@utils/theme';
import React from 'react';
import { StyleSheet } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/Ionicons';
import MaskInput from './mask-input';
import { InputProps } from './input.type';

const Input: React.FC<InputProps> = ({
    onChangeText,
    value,
    style,
    icon,
    ...props
}) => {
    //@ts-ignore
    const theme: ThemeProps = useTheme();
    const styles = makeStyles(theme);

    const textInput = (
        <TextInput
            placeholder={props.placeholder}
            placeholderTextColor={
                theme.dark ? theme.colors.lightGray : theme.colors.gray
            }
            secureTextEntry={props.secureTextEntry}
            onChangeText={onChangeText}
            value={value}
            clearButtonMode={'always'}
            activeCursor={'cell'}
            cursorColor={theme.colors.primary}
            inputMode={props.inputMode as any}
            style={[{ width: '100%', color: theme.colors.text }]}
        />
    );

    const numericInput = (
        <MaskInput onChangeText={onChangeText} value={value} />
    );

    const renderComponent = () => {
        switch (props.inputMode) {
            case 'numeric':
                return numericInput;
            default:
                return textInput;
        }
    };

    return (
        <Animated.View
            style={[
                styles.textInputWrapper,
                style,
                {
                    backgroundColor: theme.dark
                        ? theme.colors.gray
                        : theme.colors.lightGray,
                },
            ]}
        >
            <Icon
                name={icon ? icon : 'search-outline'}
                size={18}
                color={theme.dark ? theme.colors.lightGray : theme.colors.gray}
            />
            {renderComponent()}
        </Animated.View>
    );
};

export default Input;

const makeStyles = (theme: ThemeProps) =>
    StyleSheet.create({
        textInputWrapper: {
            width: '100%',
            borderRadius: 10,
            height: 40,
            paddingLeft: 10,
            flexDirection: 'row',
            gap: 10,
            alignItems: 'center',
        },
    });
