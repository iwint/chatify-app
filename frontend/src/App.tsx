import React from 'react';

import AppNavigator from './navigation';
import { EventProvider } from 'react-native-outside-press';
import {
    GestureHandlerRootView,
    NativeViewGestureHandler
} from 'react-native-gesture-handler';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';

function App(): React.JSX.Element {
    return (
        <GestureHandlerRootView>
            <BottomSheetModalProvider>
                <EventProvider>
                    <AppNavigator />
                </EventProvider>
            </BottomSheetModalProvider>
        </GestureHandlerRootView>
    );
}

export default App;
