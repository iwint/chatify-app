import { MASK } from '@constants/mask';
import { useTheme } from '@react-navigation/native';
import { ThemeProps } from '@utils/theme';
import React from 'react';
import { StyleSheet } from 'react-native';
import RNMaskInput from 'react-native-mask-input';
import { InputProps } from './input.type';

const MaskInput: React.FC<InputProps> = ({ onChangeText, value }) => {
    //@ts-ignore
    const theme: ThemeProps = useTheme();
    const styles = makeStyles(theme);
    return (
        <RNMaskInput
            style={styles.maskInput}
            value={value}
            autoFocus
            keyboardType="numeric"
            placeholder="+91 your phone number"
            onChangeText={(masked, unmasked) => {
                onChangeText && onChangeText(unmasked);
            }}
            mask={MASK}
        />
    );
};

export default MaskInput;

const makeStyles = (theme: ThemeProps) =>
    StyleSheet.create({
        maskInput: {
            color: '#000',
            backgroundColor: theme.colors.lightGray,
            borderRadius: 10,
        },
    });
