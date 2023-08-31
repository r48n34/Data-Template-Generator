import React from 'react';
import { IconFaceIdError } from '@tabler/icons-react';
import { Container, Box, Text, Group, Button } from '@mantine/core';
import { useErrorBoundary } from 'react-error-boundary';

function ErrorComp({ resetFunc }: { resetFunc: Function }){

    const { resetBoundary } = useErrorBoundary();

    return (
        <Container>
            <Box style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh"}}>
                <Box>
                    <Group position={"center"} >
                        <IconFaceIdError size={"9em"}/>
                    </Group>

                    <Text fz={32} align='center'>Opps... Something wrong</Text>
                    <Text fz={16} c="dimmed" align='center' mt={6}>May be your input CSV / XLSX is invalid</Text>
                    <Text fz={16} c="dimmed" align='center'>Please check your data source is valid or not.</Text>

                    <Group position={"center"} >
                    <Button 
                        mt={16}
                        onClick={ () => {
                            resetFunc()
                            resetBoundary()
                        }} 
                        variant='light'
                    >
                        Reload
                    </Button>
                    </Group>
                    
                </Box>
            </Box>
        </Container>
    )
}
    
export default ErrorComp
