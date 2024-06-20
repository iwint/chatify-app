import * as React from 'react';
import { useEffect, useState, useRef } from 'react';
import {
    SectionList,
    View,
    Text,
    SectionListData,
    StyleSheet,
    Image
} from 'react-native';
import sectionListGetItemLayout from 'react-native-section-list-get-item-layout';
import { IData, ISectionData, AlphabetListProps } from './types';
import { DEFAULT_CHAR_INDEX } from '@constants/alphabet-list';
import { ListLetterIndex } from './list-letter-index';
import { getSectionData } from '@utils/get-section-data';
import { BottomSheetSectionList } from '@gorhom/bottom-sheet';
import { useTheme } from '@react-navigation/native';
import { ThemeProps } from '@utils/theme';
import { defaultStyles } from '@constants/styles';

const sizes = {
    itemHeight: 40,
    headerHeight: 30,
    listHeaderHeight: 0,

    spacing: {
        small: 10,
        regular: 15,
        large: 20
    }
};

export const AlphabetList: React.FC<AlphabetListProps> = (props) => {
    const {
        data,
        index = DEFAULT_CHAR_INDEX,
        style,
        indexContainerStyle,
        indexLetterStyle,
        indexLetterContainerStyle,
        letterListContainerStyle,
        getItemHeight: onGetItemHeight = () => sizes.itemHeight,
        sectionHeaderHeight = sizes.itemHeight,
        listHeaderHeight = sizes.listHeaderHeight,
        uncategorizedAtTop = false,
        renderCustomSectionHeader,
        renderCustomItem,
        renderCustomListHeader,
        renderCustomIndexLetter,
        ...sectionListProps
    } = props;

    const colors = {
        background: {
            light: 'white',
            dark: '#8e8e93'
        },

        seperatorLine: '#e6ebf2',

        text: {
            dark: '#1c1b1e'
        },

        primary: '#007aff'
    };

    //@ts-ignore
    const theme: ThemeProps = useTheme();
    const styles = makeStyles(theme);

    const sectionListRef = useRef(null);
    const [sectionData, setSectionData] = useState<ISectionData[]>([]);

    useEffect(() => {
        setSectionData(getSectionData(data, index, uncategorizedAtTop));
    }, [data]);

    const onScrollToSection = (sectionIndex: number) => {
        const sectionList = sectionListRef.current! as SectionList;
        if (!sectionList) return;

        sectionList.scrollToLocation({
            sectionIndex,
            itemIndex: 0
        });
    };

    const onGetItemLayout: any = sectionListGetItemLayout({
        getItemHeight: (_rowData, sectionIndex: number, rowIndex: number) => {
            return onGetItemHeight(sectionIndex, rowIndex);
        },
        getSectionHeaderHeight: () => sectionHeaderHeight,
        getSectionFooterHeight: () => 0,
        listHeaderHeight
    });

    const onRenderSectionHeader = ({
        section
    }: {
        section: SectionListData<IData>;
    }) => {
        if (renderCustomSectionHeader)
            return renderCustomSectionHeader(section);

        return (
            <View testID="header" style={styles.sectionHeaderContainer}>
                <Text testID="header__label" style={styles.sectionHeaderLabel}>
                    {section.title}
                </Text>
            </View>
        );
    };

    const onRenderItem = ({ item }: any) => {
        if (renderCustomItem) return renderCustomItem(item);

        return (
            <>
                <View testID="cell" style={styles.listItemContainer}>
                    <Image
                        source={{ uri: item.img }}
                        style={{ borderRadius: 50 }}
                        width={40}
                        height={40}
                    />
                    <View style={{ flex: 1 }}>
                        <Text testID="cell__label" style={styles.listItemLabel}>
                            {item.value}
                        </Text>
                        <Text
                            testID="cell__label"
                            numberOfLines={1}
                            style={[
                                styles.listItemLabel,
                                {
                                    fontSize: 12,
                                    color: theme.dark
                                        ? theme.colors.text
                                        : theme.colors.gray
                                }
                            ]}
                        >
                            {item.desc}
                        </Text>
                    </View>
                </View>
                <View style={defaultStyles.separator} />
            </>
        );
    };

    return (
        <View style={[styles.container, style]}>
            <BottomSheetSectionList
                {...sectionListProps}
                testID="sectionList"
                ref={sectionListRef}
                sections={sectionData}
                stickySectionHeadersEnabled
                keyExtractor={(item: IData) => item.key}
                renderItem={onRenderItem}
                renderSectionHeader={onRenderSectionHeader}
                ListHeaderComponent={renderCustomListHeader}
                getItemLayout={onGetItemLayout}
            />

            <ListLetterIndex
                sectionData={sectionData}
                onPressLetter={onScrollToSection}
                indexContainerStyle={indexContainerStyle}
                indexLetterStyle={indexLetterStyle}
                indexLetterContainerStyle={indexLetterContainerStyle}
                letterListContainerStyle={letterListContainerStyle}
                renderCustomIndexLetter={renderCustomIndexLetter}
            />
        </View>
    );
};

const makeStyles = (theme: ThemeProps) =>
    StyleSheet.create({
        container: {
            position: 'relative',
            flex: 1,
            paddingTop: 20
        },

        listItemContainer: {
            flex: 1,
            flexDirection: 'row',
            padding: sizes.spacing.regular,
            alignItems: 'center',
            gap: 10,
            backgroundColor: theme.dark ? theme.colors.gray : theme.colors.white
        },

        listItemLabel: {
            color: theme.colors.text,
            fontSize: 14
        },

        sectionHeaderContainer: {
            height: sizes.headerHeight,
            backgroundColor: theme.colors.background,
            justifyContent: 'center',
            paddingHorizontal: sizes.spacing.regular
        },

        sectionHeaderLabel: {
            color: theme.dark ? theme.colors.lightGray : theme.colors.text,
            fontWeight: '600'
        }
    });
