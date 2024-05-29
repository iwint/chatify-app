import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {getTheme} from '@utils/theme';
import {useColorScheme} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import AuthStack from './auth/AuthStack';
import MainStack from './main/MainStack';

const Stack = createStackNavigator();

const AppNavigator = () => {
  const scheme = useColorScheme();
  return (
    <SafeAreaView style={{flex: 1}}>
      <NavigationContainer theme={getTheme(scheme === 'dark')}>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            animationEnabled: true,
          }}>
          <Stack.Screen name="Auth" component={AuthStack} />
          <Stack.Screen name="Main" component={MainStack} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
};

export default AppNavigator;
