import React, { useState } from 'react';
import { MantineProvider } from '@mantine/core';
import MainComp from './grandComp/MainComp';
import { CheckNodeTextType } from '../interface/generatInterface';
import { Toaster } from 'react-hot-toast';

function App() {

    const [ isFrameGroupSelected, setIsFrameGroupSelected ] = useState<CheckNodeTextType>({status: false, cols: []});

    React.useEffect(() => {
        window.onmessage = (event) => {
            const { type, data } = event.data.pluginMessage;

            if (type === 'is-frame-group-selected') {
                setIsFrameGroupSelected(data);
            }
        };
    }, []);

    return (
        <>
        <Toaster/>
        <MantineProvider theme={{ colorScheme: 'dark' }} withGlobalStyles withNormalizeCSS>
           <MainComp isFrameGroupSelected={isFrameGroupSelected}/>
        </MantineProvider>
        </>
    );
}

export default App;
