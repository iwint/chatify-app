import React, { Component } from 'react';
import { Animated, I18nManager, StyleSheet, Text, View } from 'react-native';

import {
    Swipeable as GestureSwipeable,
    RectButton
} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';

export interface SwipeableRightActionProps {
    title: string;
    color: string;
    width: number;
    icon?: string;
    onPressAction: () => void;
}

interface SwipeableProps {
    children: React.ReactNode;
    actions: Array<SwipeableRightActionProps>;
}

export default class Swipeable extends Component<SwipeableProps> {
    private renderRightAction = (
        text: string,
        color: string,
        x: number,
        progress: Animated.AnimatedInterpolation<number>,
        onPressAction: () => void,
        icon?: string
    ) => {
        const trans = progress.interpolate({
            inputRange: [0, 1],
            outputRange: [x, 0]
        });
        const pressHandler = () => {
            onPressAction();
        };

        return (
            <Animated.View
                style={{ flex: 1, transform: [{ translateX: trans }] }}
            >
                <RectButton
                    style={[styles.rightAction, { backgroundColor: color }]}
                    onPress={pressHandler}
                >
                    {icon != '' && icon && (
                        <Icon
                            color={'white'}
                            name={icon}
                            size={24}
                            style={{ paddingTop: 10 }}
                        />
                    )}
                    <Text style={styles.actionText}>{text}</Text>
                </RectButton>
            </Animated.View>
        );
    };

    private renderRightActions = (
        progress: Animated.AnimatedInterpolation<number>,
        _dragAnimatedValue: Animated.AnimatedInterpolation<number>
    ) => (
        <View
            style={{
                width: 200,
                flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row'
            }}
        >
            {this.props.actions.map((action) =>
                // this.renderRightAction('Delete', '#dd2c00', 200, progress)
                this.renderRightAction(
                    action.title,
                    action.color,
                    action.width,
                    progress,
                    action.onPressAction,
                    action.icon
                )
            )}
        </View>
    );

    private swipeableRow?: GestureSwipeable;

    private updateRef = (ref: GestureSwipeable) => {
        this.swipeableRow = ref;
    };
    private close = () => {
        this.swipeableRow?.close();
    };
    render() {
        const { children } = this.props;
        return (
            <GestureSwipeable
                ref={this.updateRef}
                friction={2}
                enableTrackpadTwoFingerGesture
                leftThreshold={30}
                rightThreshold={40}
                renderRightActions={this.renderRightActions}
            >
                {children}
            </GestureSwipeable>
        );
    }
}

const styles = StyleSheet.create({
    leftAction: {
        flex: 1,
        backgroundColor: '#497AFC',
        justifyContent: 'center'
    },
    actionText: {
        color: 'white',
        fontSize: 14,
        backgroundColor: 'transparent',
        padding: 10
    },
    rightAction: {
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center'
    }
});
