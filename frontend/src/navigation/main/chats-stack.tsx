import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Chats from '@screens/main/chats/chats';
import NewChat from '@screens/main/chats/new-chat';

const Stack = createNativeStackNavigator();

const ChatStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Chats" component={Chats} />
            <Stack.Screen
                name="NewChat"
                options={{
                    presentation: 'containedTransparentModal',
                    contentStyle: {
                        margin: 20
                    }
                }}
                component={NewChat}
            />
        </Stack.Navigator>
    );
};

export default ChatStack;
