import SearchInput from '@components/inputs/search';
import { useTheme } from '@react-navigation/native';
import { ThemeProps } from '@utils/theme';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import contacts from '@assets/data/contacts.json';
import {
    BottomSheetScrollView,
    BottomSheetSectionList
} from '@gorhom/bottom-sheet';
import { AlphabetList } from '@components/sections/alphabet-list';

interface NewChatProps {}

const NewChat: React.FC<NewChatProps> = ({}) => {
    //@ts-ignore
    const theme: ThemeProps = useTheme();
    const styles = makeStyles(theme);
    const data = contacts.map((contact, index) => ({
        value: `${contact.first_name} ${contact.last_name}`,
        name: `${contact.first_name} ${contact.last_name}`,
        img: contact.img,
        desc: contact.desc,
        key: `${contact.first_name} ${contact.last_name}-${index}`
    }));

    return (
        <SafeAreaView style={styles.container}>
            <SearchInput />
            <AlphabetList
                data={data}
                indexLetterStyle={{
                    color: theme.colors.primary,
                    fontSize: 15
                }}
            />
        </SafeAreaView>
    );
};

export default NewChat;

const makeStyles = (theme: ThemeProps) =>
    StyleSheet.create({
        container: {
            flex: 1
        },
        topSectionWrapper: {
            flexDirection: 'row',
            alignItems: 'center',
            width: '100%',
            justifyContent: 'space-between'
        },
        text: {
            color: theme.colors.text,
            fontFamily: 'bold',
            fontSize: 18
        },

        alphabetList: {
            flex: 1
        },

        listItemContainer: {
            flex: 1,
            height: 'auto',
            paddingHorizontal: 10,
            justifyContent: 'center',
            borderTopColor: theme.colors.gray,
            borderTopWidth: 1
        },

        listItemLabel: {
            color: theme.colors.gray,
            fontSize: 14
        },

        sectionHeaderContainer: {
            height: 50,
            backgroundColor: theme.colors.background,
            justifyContent: 'center',
            paddingHorizontal: 10
        },

        sectionHeaderLabel: {
            color: theme.colors.gray
        },

        listHeaderContainer: {
            height: 'auto',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center'
        }
    });
