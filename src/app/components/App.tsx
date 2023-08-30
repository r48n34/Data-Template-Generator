import React from 'react';
// import logo from '../assets/logo.svg';
// import '../styles/ui.css';
import { Container, MantineProvider, Space } from '@mantine/core';
import { DropComp } from './DropComp';

function App() {
    // const textbox = React.useRef<HTMLInputElement>(undefined);

    // const countRef = React.useCallback((element: HTMLInputElement) => {
    //     if (element) element.value = '5';
    //     textbox.current = element;
    // }, []);

    // const onCreate = () => {
    //     const count = parseInt(textbox.current.value, 10);
    //     parent.postMessage({ pluginMessage: { type: 'create-rectangles', count } }, '*');
    // };

    // const onCancel = () => {
    //     parent.postMessage({ pluginMessage: { type: 'cancel' } }, '*');
    // };

    React.useEffect(() => {
        // This is how we read messages sent from the plugin controller
        window.onmessage = (event) => {
            const { type, message } = event.data.pluginMessage;
            if (type === 'create-rectangles') {
                console.log(`Figma Says: ${message}`);
            }
        };
    }, []);

    return (
        <MantineProvider theme={{ colorScheme: 'dark' }} withGlobalStyles withNormalizeCSS>
            <Container>
                <Space h="md" />
                <DropComp />
            </Container>

        </MantineProvider>
    );
}

export default App;
