import { TABS } from '@constants/tabs-data';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTheme } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Tab = createBottomTabNavigator();

const MainStack = () => {
    const theme = useTheme();

    const getTabBarIcon = (props: {
        focused: boolean;
        color: string;
        size: number;
        name: string;
    }) => {
        return <Icon color={props.color} size={28} name={props.name} />;
    };

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <Tab.Navigator
                screenOptions={{
                    tabBarAllowFontScaling: true,
                    headerShadowVisible: false,
                    tabBarStyle: {
                        backgroundColor: theme.colors.background,
                        borderTopWidth: 0,
                        height: 60,
                        paddingBottom: 10
                    },
                    headerStyle: {
                        backgroundColor: theme.colors.background
                    }
                }}
            >
                {TABS.map((tab, index) => (
                    <Tab.Screen
                        key={index}
                        name={tab.name}
                        component={tab.component}
                        options={{
                            tabBarIcon: (props) =>
                                getTabBarIcon({
                                    color: props.color,
                                    focused: props.focused,
                                    name: tab.icon,
                                    size: props.size
                                })
                        }}
                    />
                ))}
            </Tab.Navigator>
        </GestureHandlerRootView>
    );
};

export default MainStack;
