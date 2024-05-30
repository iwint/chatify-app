import React from 'react';

import AppNavigator from './navigation';
import { EventProvider } from 'react-native-outside-press';

function App(): React.JSX.Element {
    return (
        <EventProvider>
            <AppNavigator />
        </EventProvider>
    );
}

export default App;
