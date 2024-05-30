import Button from '@components/buttons/button';
import Select from '@components/inputs/select';
import AuthLayout from '@layouts/auth-layout';
import { Theme, useTheme } from '@react-navigation/native';
import React from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface OTPProps {}

const OTP: React.FC<OTPProps> = ({}) => {
    const theme = useTheme();
    const styles = makeStyles(theme);
    const { bottom } = useSafeAreaInsets();
    return (
        <AuthLayout>
            <KeyboardAvoidingView style={{ flex: 1 }}>
                <View style={styles.container}>
                    <View>
                        <Select
                            onChange={() => {}}
                            options={[
                                {
                                    label: 'Hello',
                                    value: 'Hii'
                                }
                            ]}
                            value={'Hii'}
                        />
                        <TextInput />
                    </View>
                    <Text style={styles.description}>
                        Chatify will need to verify your account. Carrier
                        charges may apply.
                    </Text>
                    <View style={{ flex: 1 }} />
                    <Button
                        style={{ marginBottom: bottom }}
                        size="full"
                        title="Continue"
                    />
                </View>
            </KeyboardAvoidingView>
        </AuthLayout>
    );
};

export default OTP;

const makeStyles = (theme: Theme) =>
    StyleSheet.create({
        container: {
            gap: 20,
            height: '100%',
            alignItems: 'center'
        },
        description: {
            color: theme.colors.text
        }
    });
