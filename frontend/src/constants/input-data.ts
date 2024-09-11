import { InputProps } from '@components/inputs/input.type';

export const AuthBaseForm: Array<InputProps> = [
    {
        id: 'email',
        placeholder: 'Enter email',
        icon: 'mail-outline',
        inputMode: 'email',
    },
    {
        id: 'password',
        placeholder: 'Enter password',
        icon: 'lock-closed-outline',
        inputMode: 'text',
        secureTextEntry: true,
    },
];
export const AuthRegisterForm: Array<InputProps> = [
    {
        id: 'profile_picture',
        inputMode: 'image',
    },
    {
        id: 'first_name',
        placeholder: 'Enter first name',
        icon: '',
        inputMode: 'text',
    },
    {
        id: 'last_name',
        placeholder: 'Enter last name',
        icon: '',
        inputMode: 'text',
    },
    {
        id: 'phone_number',
        placeholder: 'Enter phone number',
        icon: 'call-outline',
        inputMode: 'numeric',
    },
];
