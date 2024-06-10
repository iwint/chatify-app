import Calls from "@screens/main/calls";
import Chats from "@screens/main/chats";
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
        name: 'Chats',
        icon: 'chat',
        component: Chats
    },
    {
        name: 'Settings',
        icon: 'settings',
        component: Settings
    }
]