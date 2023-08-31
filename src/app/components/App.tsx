import React, { useState } from 'react';
import { MantineProvider } from '@mantine/core';
import MainComp from './grandComp/MainComp';
import { CheckNodeTextType } from '../interface/generatInterface';

function App() {

    const [ isFrameGroupSelected, setIsFrameGroupSelected ] = useState<CheckNodeTextType>({status: false, cols: []});

    React.useEffect(() => {
        // This is how we read messages sent from the plugin controller
        window.onmessage = (event) => {
            const { type, data } = event.data.pluginMessage;

            if (type === 'is-frame-group-selected') {
                // console.log("Back data", data);
                setIsFrameGroupSelected(data);
            }
        };
    }, []);

    return (
        <MantineProvider theme={{ colorScheme: 'dark' }} withGlobalStyles withNormalizeCSS>
           <MainComp isFrameGroupSelected={isFrameGroupSelected}/>
        </MantineProvider>
    );
}

export default App;
