import * as React from 'react';
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    StyleSheet
} from 'react-native';
import { ListLetterIndexProps } from './types';
import { ISectionData } from '../types';
import { ThemeProps } from '@utils/theme';
import { useTheme } from '@react-navigation/native';

export const ListLetterIndex: React.FC<ListLetterIndexProps> = ({
    sectionData,
    onPressLetter,
    indexContainerStyle,
    indexLetterStyle,
    indexLetterContainerStyle,
    renderCustomIndexLetter,
    letterListContainerStyle
}) => {
    //@ts-ignore
    const theme: ThemeProps = useTheme();
    const styles = makeStyles(theme);
    const onRenderCustomIndexLetter = ({
        item,
        index
    }: {
        item: ISectionData;
        index: number;
    }) => {
        const onPress = () => onPressLetter(index);

        if (renderCustomIndexLetter) {
            return renderCustomIndexLetter({
                item,
                index,
                onPress
            });
        }

        return (
            <TouchableOpacity testID="indexItem" onPress={onPress}>
                <View
                    testID="indexItem__title-container"
                    style={[styles.letterIndexItem, indexLetterContainerStyle]}
                >
                    <Text
                        testID="indexItem__title"
                        style={[styles.letterIndexLabel, indexLetterStyle]}
                    >
                        {item.title}
                    </Text>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <View style={[styles.letterIndexContainer, indexContainerStyle]}>
            <FlatList
                testID="flatList"
                contentContainerStyle={[
                    styles.letterIndexList,
                    letterListContainerStyle
                ]}
                data={sectionData}
                keyExtractor={(i) => i.title}
                renderItem={onRenderCustomIndexLetter}
            />
        </View>
    );
};

const sizes = {
    containerWidth: 10,
    itemHeight: 15,
    itemFontSize: 12
};

const makeStyles = (theme: ThemeProps) =>
    StyleSheet.create({
        letterIndexContainer: {
            backgroundColor: theme.colors.background,
            height: '100%',
            position: 'absolute',
            top: 0,
            right: 0
        },

        letterIndexList: {
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%'
        },

        letterIndexItem: {
            width: sizes.containerWidth,
            height: sizes.itemHeight,
            alignItems: 'center',
            justifyContent: 'center'
        },

        letterIndexLabel: {
            fontSize: sizes.itemFontSize,
            fontWeight: 'bold',
            color: 'grey'
        }
    });
