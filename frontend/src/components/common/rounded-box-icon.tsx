import React from 'react';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

interface RoundedBoxIconProps {
    name: string;
    backgroundColor: string;
}

const RoundedBoxIcon: React.FC<RoundedBoxIconProps> = ({
    backgroundColor,
    name
}) => {
    return (
        <View
            style={{
                backgroundColor: backgroundColor,
                padding: 4,
                borderRadius: 8
            }}
        >
            <Icon name={name} size={22} color={'white'} />
        </View>
    );
};

export default RoundedBoxIcon;
