import {createStackNavigator} from '@react-navigation/stack';
import OnboardingScreen from '@screens/auth/OnboardingScreen';

const Stack = createStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false, animationEnabled: true}}>
      <Stack.Screen name="OnboardingScreen" component={OnboardingScreen} />
      <Stack.Screen name="SignUp" component={() => <></>} />
    </Stack.Navigator>
  );
};

export default AuthStack;
