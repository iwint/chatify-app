import { NavigationContainer, useTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { getTheme } from '@utils/theme';
import { StatusBar, useColorScheme } from 'react-native';
import AuthStack from './auth/auth-stack';
import MainStack from './main/main-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
    const scheme = useColorScheme();
    const theme = useTheme();
    return (
        <SafeAreaProvider style={{ flex: 1 }}>
            <NavigationContainer theme={getTheme(scheme === 'dark')}>
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
            </NavigationContainer>
        </SafeAreaProvider>
    );
};

export default AppNavigator;
