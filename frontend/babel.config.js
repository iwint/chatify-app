module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          "@assets": "./src/assets",
          "@components": "./src/components",
          "@config": "./src/config",
          "@constants": "./src/constants",
          "@hooks": "./src/hooks",
          "@navigation": "./src/navigation",
          "@screens": "./src/screens",
          "@utils": "./src/utils",
        }
      },
    ],

    'react-native-reanimated/plugin',]
};
