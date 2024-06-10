import RoundedBoxIcon from '@components/common/rounded-box-icon';
import { defaultStyles } from '@constants/styles';
import { useTheme } from '@react-navigation/native';
import { ThemeProps } from '@utils/theme';
import React from 'react';
import { Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

interface SettingCardProps {
    item: any;
    onPress: () => void;
}

const SettingCard: React.FC<SettingCardProps> = ({ item }) => {
    //@ts-ignore
    const theme: ThemeProps = useTheme();
    return (
        <View style={defaultStyles.item}>
            <View style={defaultStyles.row}>
                <RoundedBoxIcon
                    backgroundColor={item.backgroundColor}
                    name={item.icon}
                />
                <Text style={{ color: theme.colors.text }}>{item.name}</Text>
            </View>
            <Icon name="chevron-forward" size={20} color={theme.colors.text} />
        </View>
    );
};

export default SettingCard;
