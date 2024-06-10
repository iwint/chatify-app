import { NavigationContainer, useTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { getTheme } from '@utils/theme';
import { StatusBar, useColorScheme } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AuthStack from './auth/auth-stack';
import MainStack from './main/main-stack';

const Stack = createStackNavigator();

const AppNavigator = () => {
    const scheme = useColorScheme();
    const theme = useTheme();
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <NavigationContainer theme={getTheme(scheme === 'dark')}>
                <StatusBar
                    backgroundColor={
                        getTheme(scheme === 'dark').colors.background
                    }
                />
                <Stack.Navigator
                    screenOptions={{
                        headerShown: false,
                        animationEnabled: true
                    }}
                >
                    <Stack.Screen name="Main" component={MainStack} />
                    <Stack.Screen name="Auth" component={AuthStack} />
                </Stack.Navigator>
            </NavigationContainer>
        </SafeAreaView>
    );
};

export default AppNavigator;
