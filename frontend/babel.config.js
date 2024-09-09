module.exports = {
    presets: ["module:@react-native/babel-preset"],
    plugins: [
        [
            "module-resolver",
            {
                root: ["./src"],
                alias: {
                    "@assets": "./src/assets",
                    "@components": "./src/components",
                    "@config": "./src/config",
                    "@constants": "./src/constants",
                    "@hooks": "./src/hooks",
                    "@navigation": "./src/navigation",
                    "@screens": "./src/screens",
                    "@utils": "./src/utils",
                    "@layouts": "./src/layouts",
                    "@models": "./src/models",
                },
            },
        ],
        [
            "module:react-native-dotenv",
            {
                moduleName: "@env",
            },
        ],
        "react-native-reanimated/plugin",
    ],
};
