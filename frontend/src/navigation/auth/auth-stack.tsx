import { createStackNavigator } from '@react-navigation/stack';
import Login from '@screens/auth/login';
import OnboardingScreen from '@screens/auth/onboarding-screen';
import OTP from '@screens/auth/otp-screen';

const Stack = createStackNavigator();

const AuthStack = () => {
    return (
        <Stack.Navigator
            screenOptions={{ headerShown: false, animationEnabled: true }}
        >
            <Stack.Screen
                name="OnboardingScreen"
                component={OnboardingScreen}
            />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="OTP" component={OTP} />
        </Stack.Navigator>
    );
};

export default AuthStack;
