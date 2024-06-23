import ChatStack from "@navigation/main/chats-stack";
import Calls from "@screens/main/calls";
import Communities from "@screens/main/communities";
import Settings from "@screens/main/settings";
import UpdatesScreen from "@screens/main/updates";

export const TABS = [
    {
        name: 'Updates',
        icon: 'update',
        material: true,
        component: UpdatesScreen
    },
    {
        name: 'Calls',
        icon: 'call',
        material: true,
        component: Calls
    },
    {
        name: 'Communities',
        icon: 'groups',
        material: true,
        component: Communities
    },
    {
        name: 'ChatStack',
        icon: 'chatbubbles',
        component: ChatStack
    },
    {
        name: 'Settings',
        icon: 'cog-outline',
        component: Settings
    }
]