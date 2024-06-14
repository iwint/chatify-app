import React, { Component, PropsWithChildren } from 'react';
import { Animated, StyleSheet, Text, View, I18nManager } from 'react-native';

import {
    RectButton,
    Swipeable as GestureSwipeable
} from 'react-native-gesture-handler';

interface SwipeableProps {
    children: React.ReactNode;
    onDelete: () => void;
}

export default class Swipeable extends Component<SwipeableProps> {
    private renderRightAction = (
        text: string,
        color: string,
        x: number,
        progress: Animated.AnimatedInterpolation<number>
    ) => {
        const trans = progress.interpolate({
            inputRange: [0, 1],
            outputRange: [x, 0]
        });
        const pressHandler = () => {
            this.props.onDelete();
        };

        return (
            <Animated.View
                style={{ flex: 1, transform: [{ translateX: trans }] }}
            >
                <RectButton
                    style={[styles.rightAction, { backgroundColor: color }]}
                    onPress={pressHandler}
                >
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
            {this.renderRightAction('Delete', '#dd2c00', 200, progress)}
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
        fontSize: 16,
        backgroundColor: 'transparent',
        padding: 10
    },
    rightAction: {
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center'
    }
});
