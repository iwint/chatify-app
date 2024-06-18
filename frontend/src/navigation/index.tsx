import { NavigationContainer, useTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { getTheme } from '@utils/theme';
import { StatusBar, useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AuthStack from './auth/auth-stack';
import MainStack from './main/main-stack';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
    const scheme = useColorScheme();
    const theme = useTheme();
    return (
        <NavigationContainer theme={getTheme(scheme === 'dark')}>
            <SafeAreaProvider style={{ flex: 1 }}>
                <StatusBar
                    backgroundColor={
                        getTheme(scheme === 'dark').colors.background
                    }
                />
                <Stack.Navigator
                    screenOptions={{
                        headerShown: false
                    }}
                >
                    <Stack.Screen name="Main" component={MainStack} />
                    <Stack.Screen name="Auth" component={AuthStack} />
                </Stack.Navigator>
            </SafeAreaProvider>
        </NavigationContainer>
    );
};

export default AppNavigator;
