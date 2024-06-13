import { defaultStyles } from '@constants/styles';
import { useTheme } from '@react-navigation/native';
import { ThemeProps } from '@utils/theme';
import React from 'react';
import { FlatList, StyleSheet, useColorScheme, View } from 'react-native';

interface ListBlockProps {
    data: Array<any>;
    renderComponent: (item: any) => React.ReactNode;
}

const ListBlock: React.FC<ListBlockProps> = ({ data, renderComponent }) => {
    //@ts-ignore
    const theme: ThemeProps = useTheme();
    const styles = makeStyles(theme);
    const scheme = useColorScheme();
    return (
        <View
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
            <FlatList
                scrollEnabled={false}
                data={data}
                ItemSeparatorComponent={() => (
                    <View style={defaultStyles.separator} />
                )}
                renderItem={({ item }) => renderComponent(item) as any}
            />
        </View>
    );
};

export default ListBlock;

const makeStyles = (theme: ThemeProps) => StyleSheet.create({});
