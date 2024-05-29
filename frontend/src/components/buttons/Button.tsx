import {useTheme} from '@react-navigation/native';
import {ThemeProps} from '@utils/theme';
import React from 'react';
import {
  Pressable as RNButton,
  PressableProps as RNButtonProps,
  StyleProp,
  StyleSheet,
  Text,
  ViewStyle,
} from 'react-native';

type ButtonSize = 'small' | 'medium' | 'large' | 'full';

interface ButtonProps extends RNButtonProps {
  size: ButtonSize;
  textColor: string;
  backgroundColor: string;
  title: string;
}

const Button: React.FC<ButtonProps> = ({
  size,
  textColor,
  backgroundColor,
  title,
  ...props
}) => {
  const theme = useTheme();
  const styles = makeStyles(theme as ThemeProps);

  const getSize: StyleProp<ViewStyle> | any = () => {
    switch (size) {
      case 'small':
        return {paddingVertical: 10, paddingHorizontal: 20, width: undefined};
      case 'medium':
        return {paddingVertical: 15, paddingHorizontal: 25, width: undefined};
      case 'large':
        return {paddingVertical: 20, paddingHorizontal: 30, width: undefined};
      case 'full':
        return {paddingVertical: 18, paddingHorizontal: 30, width: '100%'};
      default:
        return {paddingVertical: 15, paddingHorizontal: 25, width: undefined};
    }
  };

  const getColor = () => {
    return {
      color: textColor ? textColor : theme.colors.text,
      backgroundColor: backgroundColor ? backgroundColor : theme.colors.primary,
    };
  };

  return (
    <RNButton
      onPress={props.onPress}
      style={[styles.container, getSize(), getColor(), props.style]}>
      <Text style={styles.text}>{title}</Text>
    </RNButton>
  );
};

export default Button;

const makeStyles = (theme: ThemeProps) =>
  StyleSheet.create({
    container: {
      borderRadius: 10,
    },
    text: {
      textAlign: 'center',
      fontSize: theme.getResponsive(18, 'width'),
      color: theme.colors.text,
    },
  });
