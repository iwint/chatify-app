import { TABS } from '@constants/tabs-data';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTheme } from '@react-navigation/native';
import IonIcon from 'react-native-vector-icons/Ionicons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

const Tab = createBottomTabNavigator();

const MainStack = () => {
    const theme = useTheme();

    const getTabBarIcon = (props: {
        focused: boolean;
        color: string;
        size: number;
        name: string;
        material?: boolean;
    }) => {
        return (
            <>
                {props.material ? (
                    <MaterialIcon
                        color={props.color}
                        size={28}
                        name={props.name}
                    />
                ) : (
                    <IonIcon color={props.color} size={28} name={props.name} />
                )}
            </>
        );
    };

    return (
        <BottomSheetModalProvider>
            <Tab.Navigator
                screenOptions={{
                    tabBarAllowFontScaling: true,
                    headerShadowVisible: false,
                    headerShown: false,
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
                            title:
                                tab.name === 'ChatStack' ? 'Chats' : undefined,
                            tabBarIcon: (props) =>
                                getTabBarIcon({
                                    color: props.color,
                                    focused: props.focused,
                                    name: tab.icon,
                                    size: props.size,
                                    material: tab.material
                                })
                        }}
                    />
                ))}
            </Tab.Navigator>
        </BottomSheetModalProvider>
    );
};

export default MainStack;
