import { AlphabetListProps, ISectionData } from "../types";

export interface ListLetterIndexProps {
    onPressLetter: (sectionIndex: number) => void;
    sectionData: ISectionData[];
    indexContainerStyle?: AlphabetListProps["indexContainerStyle"],
    indexLetterStyle?: AlphabetListProps["indexLetterStyle"],
    indexLetterContainerStyle?: AlphabetListProps["indexLetterContainerStyle"],
    renderCustomIndexLetter?: AlphabetListProps["renderCustomIndexLetter"],
    letterListContainerStyle?: AlphabetListProps["letterListContainerStyle"]
}