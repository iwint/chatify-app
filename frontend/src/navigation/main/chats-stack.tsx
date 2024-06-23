import { useTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Chats from '@screens/main/chats/chats';
import SingleChat from '@screens/main/chats/single-chat';

const Stack = createNativeStackNavigator();

const ChatStack = () => {
    const theme = useTheme();
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Chats" component={Chats} />
            <Stack.Screen name="SingleChat" component={SingleChat} />
        </Stack.Navigator>
    );
};

export default ChatStack;
