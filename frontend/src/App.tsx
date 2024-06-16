import React from 'react';

import AppNavigator from './navigation';
import { EventProvider } from 'react-native-outside-press';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

function App(): React.JSX.Element {
    return (
        <GestureHandlerRootView>
            <EventProvider>
                <AppNavigator />
            </EventProvider>
        </GestureHandlerRootView>
    );
}

export default App;
