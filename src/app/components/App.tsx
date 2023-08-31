import React, { useState } from 'react';
import { MantineProvider } from '@mantine/core';
import MainComp from './grandComp/MainComp';

function App() {

    const [ isFrameGroupSelected, setIsFrameGroupSelected ] = useState<boolean>(false);

    React.useEffect(() => {
        // This is how we read messages sent from the plugin controller
        window.onmessage = (event) => {
            const { type, data } = event.data.pluginMessage;

            if (type === 'is-frame-group-selected') {
                console.log(`Figma Says: ${data}`);
                setIsFrameGroupSelected(data)
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
