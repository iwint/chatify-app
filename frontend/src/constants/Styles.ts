import { StyleSheet } from "react-native";
import Colors from "./colors";

export const defaultStyles = StyleSheet.create({
    block: {
        borderRadius: 10,
        marginHorizontal: 14,
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10,
        gap: 10,
    },
    separator: {
        height: StyleSheet.hairlineWidth,
        backgroundColor: Colors.lightGray,
        marginLeft: 50,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10
    }
});