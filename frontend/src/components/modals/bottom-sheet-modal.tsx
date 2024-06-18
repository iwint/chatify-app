import {
    BottomSheetBackdrop,
    BottomSheetHandleProps,
    BottomSheetModal,
    BottomSheetView,
    TouchableOpacity,
    useBottomSheetModal
} from '@gorhom/bottom-sheet';
import { useTheme } from '@react-navigation/native';
import { ThemeProps } from '@utils/theme';
import { forwardRef, useCallback, useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

interface BottomModalProps {
    title?: string;
    initialIndex: number;
    children: React.ReactNode;
}

type Ref = BottomSheetModal;

const BottomModal = forwardRef<Ref, BottomModalProps>(
    ({ title, initialIndex, children }, ref) => {
        //@ts-ignore
        const theme: ThemeProps = useTheme();
        const styles = makeStyles(theme);
        const { dismiss } = useBottomSheetModal();
        const renderBackdrop = useCallback(
            (props: any) => (
                <BottomSheetBackdrop
                    disappearsOnIndex={-1}
                    appearsOnIndex={0}
                    opacity={0.5}
                    style={{ zIndex: 800, elevation: 500 }}
                    {...props}
                />
            ),
            []
        );

        const snapPoints = useMemo(() => ['25%', '50%', '95%'], []);

        const Header: React.FC<BottomSheetHandleProps> = ({}) => {
            return (
                <View style={styles.topSectionWrapper}>
                    <Text style={styles.text}>New chat</Text>
                    <TouchableOpacity onPress={() => dismiss()}>
                        <Icon
                            style={styles.closeIcon}
                            name="close-outline"
                            size={20}
                            color={theme.colors.text}
                        />
                    </TouchableOpacity>
                </View>
            );
        };

        return (
            <BottomSheetModal
                backdropComponent={renderBackdrop}
                ref={ref}
                index={initialIndex}
                snapPoints={snapPoints}
                animateOnMount={true}
                handleIndicatorStyle={styles.indicatorStyle}
                handleStyle={styles.handleStyle}
                handleComponent={title ? Header : undefined}
            >
                <BottomSheetView style={styles.container}>
                    {children}
                </BottomSheetView>
            </BottomSheetModal>
        );
    }
);

const makeStyles = (theme: ThemeProps) =>
    StyleSheet.create({
        container: {
            flex: 1,
            padding: 24,
            backgroundColor: theme.colors.background
        },
        handleStyle: {
            backgroundColor: theme.colors.background,
            borderTopStartRadius: 10,
            borderTopEndRadius: 10
        },
        indicatorStyle: {
            backgroundColor: theme.colors.text
        },
        topSectionWrapper: {
            flexDirection: 'row',
            alignItems: 'center',
            width: '100%',
            backgroundColor: theme.colors.background,
            padding: 10,
            paddingVertical: 15,
            justifyContent: 'space-between',
            borderTopStartRadius: 10,
            borderTopEndRadius: 10
        },
        text: {
            color: theme.colors.text,
            fontFamily: 'bold',
            fontSize: 18,
            textAlign: 'center',
            flex: 1
        },
        closeIcon: {
            backgroundColor: theme.colors.gray,
            padding: 2,
            borderRadius: 50
        }
    });

export default BottomModal;
