import { DarkTheme, DefaultTheme, Theme as NavigationThemeProps } from "@react-navigation/native";
import { Dimensions } from "react-native";



export interface ThemeProps {
    getResponsive: (value: number, deviceDimension: 'width' | 'height') => number;
    dimension: {
        width: number;
        height: number;
    },
    colors: {
        primary: string;
        muted: string;
        background: string;
        gray: string;
        lightGray: string;
        green: string;
        lightGreen: string;
        red: string;
        yellow: string;
        text: string;
        white: string
    }
}

const LightModeTheme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        primary: '#1063FD',
        muted: '#3A5A92',
        background: '#DCDCE2',
        gray: '#6E6E73',
        lightGray: '#DCDCE2',
        green: '#4FEE57',
        lightGreen: '#DBFFCB',
        red: '#EF0827',
        yellow: '#FCC70B',
        text: '#000000',
        white: "#fff"
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
        lightGray: '#F0F0F0',
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