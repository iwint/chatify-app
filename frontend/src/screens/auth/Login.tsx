import AuthLayout from "@layouts/auth-layout";
import {
  GoogleSigninButton,
  GoogleSignin,
  statusCodes,
} from "@react-native-google-signin/google-signin";
import {
  StackActions,
  useNavigation,
  useTheme,
} from "@react-navigation/native";
import { ThemeProps } from "@utils/theme";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  ToastAndroid,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface LoginProps {}

const MASK = [
  "+",
  /\d/,
  /\d/,
  " ",
  /\d/,
  /\d/,
  /\d/,
  /\d/,
  /\d/,
  " ",
  /\d/,
  /\d/,
  /\d/,
  /\d/,
  /\d/,
];

const Login: React.FC<LoginProps> = ({}) => {
  // @ts-ignore
  const theme: ThemeProps = useTheme();
  const styles = makeStyles(theme);
  const navigation = useNavigation();
  const { bottom } = useSafeAreaInsets();
  const [phone, setPhone] = useState("");
  const handleNavigation = () => {
    navigation.dispatch(StackActions.push("OTP", { phone: phone }));
  };

  GoogleSignin.configure({
    offlineAccess: true,
    webClientId: process.env.GOOGLE_CLIENT_ID,
  });

  const getGoodleAuthDetails = () => {
    return new Promise(async (resolve, reject) => {
      await GoogleSignin.signIn()
        .then((res) => resolve(res))
        .catch((err) => {
          if (Object.values(statusCodes).includes(err.code)) {
            ToastAndroid.show("Something went wrong", ToastAndroid.SHORT);
            reject(err);
          }
        });
    });
  };

  const authenticateUser = async () => {};

  const keyboardOffset = Platform.OS === "ios" ? "padding" : "padding";
  return (
    <AuthLayout>
      <KeyboardAvoidingView
        behavior={keyboardOffset}
        style={{ flex: 1, justifyContent: "flex-end" }}
      >
        <View style={styles.container}>
          <View style={{ width: "100%", gap: 10 }}>
            {/* <MaskInput
                            style={styles.maskInput}
                            value={phone}
                            autoFocus
                            keyboardType="numeric"
                            placeholder="+91 your phone number"
                            onChangeText={(masked, unmasked) => {
                                setPhone(unmasked);
                            }}
                            mask={MASK}
                        /> */}
          </View>
          <Text style={styles.description}>
            Chatify will need to verify your account. Carrier charges may apply.
          </Text>
          <View style={{ flex: 1 }} />
          <View style={{ width: "100%" }}>
            <GoogleSigninButton
              size={GoogleSigninButton.Size.Wide}
              style={{
                width: "100%",
                borderRadius: 10,
                minHeight: 50,
              }}
              role="button"
              color={GoogleSigninButton.Color.Dark}
              onPress={() => {
                // initiate sign in
              }}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    </AuthLayout>
  );
};

const makeStyles = (theme: ThemeProps) =>
  StyleSheet.create({
    container: {
      gap: 20,
      alignItems: "center",
      justifyContent: "flex-end",
      height: "80%",
      flex: 1,
    },
    description: {
      color: theme.colors.text,
    },
    maskInput: {
      color: "#000",
      backgroundColor: theme.colors.lightGray,
      borderRadius: 10,
      paddingHorizontal: 15,
    },
    loading: {
      ...StyleSheet.absoluteFillObject,
      zIndex: 10,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: theme.colors.background,
    },
  });

export default Login;
