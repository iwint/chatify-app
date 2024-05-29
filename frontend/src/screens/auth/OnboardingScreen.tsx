import Button from '@components/buttons/Button';
import Colors from '@constants/Colors';
import {Theme, useTheme} from '@react-navigation/native';
import React from 'react';
import {Image, StyleSheet, Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

interface OnboardingScreenProps {}

const welcomeImage = Image.resolveAssetSource(
  require('@assets/images/welcome-image.png'),
).uri;

const OnboardingScreen: React.FC<OnboardingScreenProps> = ({}) => {
  const theme = useTheme();
  const styles = makeStyles(theme);
  return (
    <SafeAreaView style={styles.container}>
      <Image source={{uri: welcomeImage}} style={styles.welcome} />
      <Text style={styles.heading}>Welcome to the Chatify</Text>
      <Text style={styles.description}>
        Chatify is a messaging app that lets you chat with friends and family.
        You can send messages, photos, and videos. You can also make voice and
        video calls.
      </Text>
      <Button
        backgroundColor=""
        size="full"
        style={{
          position: 'absolute',
          bottom: 20,
        }}
        onPress={() => {}}
        textColor=""
        title="Get Started"
      />
    </SafeAreaView>
  );
};

export default OnboardingScreen;

const makeStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      justifyContent: 'center',
      alignItems: 'center',
    },
    welcome: {
      resizeMode: 'contain',
      width: '100%',
      height: 300,
      marginBottom: 50,
    },
    heading: {
      fontSize: 24,
      fontWeight: 'bold',
      marginVertical: 20,
      color: theme.colors.text,
    },
    description: {
      color: theme.colors.text,
    },
    link: {
      color: Colors.gray,
    },
  });
