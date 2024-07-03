import { useTheme } from '@react-navigation/native';
import { ThemeProps } from '@utils/theme';
import React from 'react';
import {
    TouchableOpacityProps as RNButtonProps,
    StyleProp,
    StyleSheet,
    Text,
    ViewStyle
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';

type ButtonSize = 'small' | 'medium' | 'large' | 'full';

interface ButtonProps extends RNButtonProps {
    size: ButtonSize;
    textColor?: string;
    backgroundColor?: string;
    title: string;
    icon?: string;
}

const Button: React.FC<ButtonProps> = ({
    size,
    textColor,
    backgroundColor,
    title,
    icon,
    ...props
}) => {
    const theme = useTheme();
    const styles = makeStyles(theme as unknown as ThemeProps);

    const getSize: StyleProp<ViewStyle> | any = () => {
        switch (size) {
            case 'small':
                return {
                    paddingVertical: 10,
                    paddingHorizontal: 20,
                    fontSize: 14,
                    width: undefined
                };
            case 'medium':
                return {
                    paddingVertical: 15,
                    paddingHorizontal: 25,
                    width: undefined,
                    fontSize: 16
                };
            case 'large':
                return {
                    paddingVertical: 20,
                    paddingHorizontal: 30,
                    width: undefined,
                    fontSize: 16
                };
            case 'full':
                return {
                    paddingVertical: 18,
                    paddingHorizontal: 30,
                    width: '100%',
                    fontSize: 16
                };
            default:
                return {
                    paddingVertical: 15,
                    paddingHorizontal: 25,
                    width: undefined,
                    fontSize: 16
                };
        }
    };

    const getColor = () => {
        return {
            color: textColor ? textColor : '#fff',
            backgroundColor: backgroundColor
                ? backgroundColor
                : theme.colors.primary
        };
    };

    return (
        <TouchableOpacity
            onPress={props.onPress as any}
            disabled={props.disabled}
            style={[
                styles.container,
                getSize(),
                getColor(),
                props.style,
                { opacity: props.disabled ? 0.7 : 1 }
            ]}
        >
            {icon && <Icon size={24} color={'#fff'} name={icon} />}
            <Text
                style={[
                    styles.text,
                    {
                        fontSize: getSize().fontSize,
                        color: getColor().color
                    }
                ]}
            >
                {title}
            </Text>
        </TouchableOpacity>
    );
};

export default Button;

const makeStyles = (theme: ThemeProps) =>
    StyleSheet.create({
        container: {
            borderRadius: 10
        },
        text: {
            textAlign: 'center'
        }
    });
