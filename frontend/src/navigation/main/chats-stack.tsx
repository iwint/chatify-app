import { useTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Chats from '@screens/main/chats/chats';

const Stack = createNativeStackNavigator();

const ChatStack = () => {
    const theme = useTheme();
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Chats" component={Chats} />
        </Stack.Navigator>
    );
};

export default ChatStack;
