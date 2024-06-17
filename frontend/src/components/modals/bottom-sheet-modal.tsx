import {
    BottomSheetBackdrop,
    BottomSheetModal,
    BottomSheetView
} from '@gorhom/bottom-sheet';
import { forwardRef, useCallback, useMemo } from 'react';
import { StyleSheet, Text } from 'react-native';

interface BottomModalProps {
    title: string;
    initialIndex: number;
    children: React.ReactNode;
}

type Ref = BottomSheetModal;

const BottomModal = forwardRef<Ref, BottomModalProps>(
    ({ title, initialIndex, children }, ref) => {
        const renderBackdrop = useCallback(
            (props: any) => (
                <BottomSheetBackdrop
                    opacity={0.5}
                    style={{ zIndex: 800, elevation: 500 }}
                    {...props}
                />
            ),
            []
        );

        const snapPoints = useMemo(() => ['25%', '50%', '95%'], []);

        return (
            <BottomSheetModal
                backdropComponent={renderBackdrop}
                ref={ref}
                index={initialIndex}
                snapPoints={snapPoints}
                animateOnMount={true}
            >
                <BottomSheetView>{children}</BottomSheetView>
            </BottomSheetModal>
        );
    }
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24
    }
});

export default BottomModal;
