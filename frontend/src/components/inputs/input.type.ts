import { InputModeOptions, TextInputProps } from 'react-native';

type CustomTextInputProps = Omit<TextInputProps, 'inputMode'> & {
    inputMode?: InputModeOptions | 'image';
};

export type InputProps = {
    icon?: string;
} & CustomTextInputProps;
