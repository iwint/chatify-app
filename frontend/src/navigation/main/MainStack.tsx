import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Text} from 'react-native';

const Tab = createBottomTabNavigator();

const MainStack = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={() => <Text>Hello Home</Text>} />
      <Tab.Screen name="Profile" component={() => <></>} />
    </Tab.Navigator>
  );
};

export default MainStack;
