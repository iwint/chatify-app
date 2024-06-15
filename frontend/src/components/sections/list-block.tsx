import { defaultStyles } from '@constants/styles';
import { useTheme } from '@react-navigation/native';
import { ThemeProps } from '@utils/theme';
import React from 'react';
import { FlatList, StyleSheet, useColorScheme, View } from 'react-native';
import Animated, { CurvedTransition } from 'react-native-reanimated';

interface ListBlockProps {
    data: Array<any>;
    renderComponent: (item: any, index: number) => React.ReactNode;
}

const transition = CurvedTransition.delay(100);

const ListBlock: React.FC<ListBlockProps> = ({ data, renderComponent }) => {
    //@ts-ignore
    const theme: ThemeProps = useTheme();
    const styles = makeStyles(theme);
    const scheme = useColorScheme();
    return (
        <Animated.View
            layout={transition}
            style={[
                defaultStyles.block,
                {
                    backgroundColor:
                        scheme === 'dark'
                            ? theme.colors.gray
                            : theme.colors.white
                }
            ]}
        >
            <Animated.FlatList
                skipEnteringExitingAnimations
                itemLayoutAnimation={transition}
                scrollEnabled={false}
                snapToEnd
                data={data}
                ItemSeparatorComponent={() => (
                    <View style={defaultStyles.separator} />
                )}
                renderItem={({ item, index }) =>
                    renderComponent(item, index) as any
                }
            />
        </Animated.View>
    );
};

export default ListBlock;

const makeStyles = (theme: ThemeProps) => StyleSheet.create({});
