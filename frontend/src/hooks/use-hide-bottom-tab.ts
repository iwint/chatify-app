import { useNavigation, useTheme } from '@react-navigation/native';
import { useEffect } from 'react';

export function useHideBottomBar() {
    const navigation = useNavigation();
    const theme = useTheme()
    useEffect(() => {
        navigation.addListener('focus', () => {
            navigation.getParent()?.setOptions({
                tabBarStyle: { display: 'none' },
                tabBarVisible: true,
            });
        });
        navigation.addListener('blur', () => {
            navigation.getParent()?.setOptions({
                tabBarStyle: {
                    display: 'flex',
                    backgroundColor: theme.colors.background,
                    borderTopWidth: 0,
                    height: 60,
                    paddingBottom: 10
                },
                tabBarVisible: false,
            });
        });
    }, [navigation]);
}
