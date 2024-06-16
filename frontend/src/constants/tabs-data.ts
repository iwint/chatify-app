import ChatStack from "@navigation/main/chats-stack";
import Calls from "@screens/main/calls";
import Communities from "@screens/main/communities";
import Settings from "@screens/main/settings";
import UpdatesScreen from "@screens/main/updates";

export const TABS = [
    {
        name: 'Updates',
        icon: 'update',
        component: UpdatesScreen
    },
    {
        name: 'Calls',
        icon: 'call',
        component: Calls
    },
    {
        name: 'Communities',
        icon: 'groups',
        component: Communities
    },
    {
        name: 'ChatStack',
        icon: 'chat',
        component: ChatStack
    },
    {
        name: 'Settings',
        icon: 'settings',
        component: Settings
    }
]