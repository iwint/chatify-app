import Button from '@components/buttons/button';
import { useTheme } from '@react-navigation/native';
import {
    StackNavigationOptions,
    StackScreenProps,
} from '@react-navigation/stack';
import { ThemeProps } from '@utils/theme';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {
    CodeField,
    Cursor,
    useBlurOnFulfill,
    useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const CELL_COUNT = 6;

interface OTPProps extends StackScreenProps<any> {}

const HEADER_OPTIONS: StackNavigationOptions = {
    headerShown: true,
    title: 'Verify you phone number',
    animationEnabled: true,
    headerShadowVisible: false,
    headerStatusBarHeight: 10,
    headerTitleStyle: {
        fontSize: 18,
    },
};

const OTP: React.FC<OTPProps> = (props) => {
    // @ts-ignore
    const theme: ThemeProps = useTheme();
    const styles = makeStyles(theme);
    const [code, setCode] = useState('');
    const { top } = useSafeAreaInsets();
    const ref = useBlurOnFulfill({ value: code, cellCount: CELL_COUNT });
    const [codeProps, getCellOnLayoutHandler] = useClearByFocusCell({
        value: code,
        setValue: setCode,
    });

    useEffect(() => {
        props.navigation.setOptions({
            ...HEADER_OPTIONS,
            headerStyle: {
                backgroundColor: theme.colors.background,
            },
        });
    }, [props.navigation]);

    useEffect(() => {
        if (code.length == 6) {
            props.navigation.reset({ index: 0, routes: [{ name: 'Main' }] });
        }
    }, [code]);

    return (
        <View style={[styles.container, { marginTop: top }]}>
            <Text style={styles.legal}>
                We have sent you an SMS with a code to the number above.
            </Text>
            <Text style={styles.legal}>
                To complete your phone number verification, please enter the
                6-digit activation code.
            </Text>

            <CodeField
                autoFocus
                ref={ref}
                {...props}
                value={code}
                onChangeText={setCode}
                cellCount={CELL_COUNT}
                rootStyle={styles.codeFieldRoot}
                keyboardType="number-pad"
                textContentType="oneTimeCode"
                renderCell={({ index, symbol, isFocused }) => (
                    <View
                        onLayout={getCellOnLayoutHandler(index)}
                        key={index}
                        style={[styles.cellRoot, isFocused && styles.focusCell]}
                    >
                        <Text style={styles.cellText}>
                            {symbol || (isFocused ? <Cursor /> : null)}
                        </Text>
                    </View>
                )}
            />

            <Button
                size="small"
                backgroundColor={theme.colors.background}
                title={`Didn't receive a verification code?`}
                onPress={() => {}}
            />
        </View>
    );
};

export default OTP;

const makeStyles = (theme: ThemeProps) =>
    StyleSheet.create({
        container: {
            flex: 1,
            alignItems: 'center',
            padding: 20,
            backgroundColor: theme.colors.background,
            gap: 20,
        },
        legal: {
            fontSize: 14,
            textAlign: 'center',
            color: theme.colors.text,
        },
        button: {
            width: '100%',
            alignItems: 'center',
        },
        buttonText: {
            color: theme.colors.primary,
            fontSize: 18,
        },
        codeFieldRoot: {
            marginTop: 20,
            width: 260,
            marginLeft: 'auto',
            marginRight: 'auto',
            gap: 4,
        },
        cellRoot: {
            width: 40,
            height: 40,
            justifyContent: 'center',
            alignItems: 'center',
            borderBottomColor: '#ccc',
            borderBottomWidth: 1,
        },
        cellText: {
            color: theme.colors.text,
            fontSize: 18,
            textAlign: 'center',
        },
        focusCell: {
            paddingBottom: 4,
            borderBottomColor: theme.colors.primary,
            borderBottomWidth: 2,
        },
    });
