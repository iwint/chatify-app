import { DarkTheme, DefaultTheme, Theme as NavigationThemeProps } from "@react-navigation/native";
import { Dimensions } from "react-native";


export interface ThemeProps extends NavigationThemeProps {
    getResponsive: (value: number, deviceDimension: 'width' | 'height') => number;
    dimension: {
        width: number;
        height: number;
    },
}

const LightModeTheme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        primary: '#31C48D',
        muted: '#3A5A92',
        background: '#EFEEF6',
        gray: '#6E6E73',
        lightGray: '#DCDCE2',
        green: '#4FEE57',
        lightGreen: '#DBFFCB',
        red: '#EF0827',
        yellow: '#FCC70B',
        text: '#000000',
    },
};

const DarkModeTheme = {
    ...DarkTheme,
    colors: {
        ...DefaultTheme.colors,
        primary: '#31C48D',
        muted: '#3A5A92',
        background: '#121212',
        gray: '#6E6E73',
        lightGray: '#DCDCE2',
        green: '#4FEE57',
        lightGreen: '#DBFFCB',
        red: '#EF0827',
        yellow: '#FCC70B',
        text: '#FFFFFF',
    },
};



const Theme = {
    getResponsive: (value: number, deviceDimension: 'width' | 'height') => {
        const dimensions = Dimensions.get('window')[deviceDimension]
        const percentage = value / dimensions
        return dimensions * percentage
    },
    dimension: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height
    }
}


export const getTheme = (isDarkMode: boolean) => {

    return isDarkMode ? {
        ...DarkModeTheme,
        ...Theme
    } : {
        ...LightModeTheme,
        ...Theme
    };
}