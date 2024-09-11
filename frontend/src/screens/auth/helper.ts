import { AuthBaseForm, AuthRegisterForm } from '@constants/input-data';
import type { AuthStatus } from './auth.types';

export const getFormData = (status: AuthStatus) => {
    return status === 'register' ? AuthRegisterForm : AuthBaseForm;
};
