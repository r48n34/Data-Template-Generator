import React from 'react';

import { Group, Text, useMantineTheme, rem, Box } from '@mantine/core';
import { IconUpload, IconPhoto, IconX } from '@tabler/icons-react';
import { Dropzone, DropzoneProps, FileWithPath } from '@mantine/dropzone';

import Papa from "papaparse";
import { CSVDataArray } from '../../interface/generatInterface';

interface DropCompProps extends Partial<DropzoneProps> {
    setData: Function
}

export function DropComp(props: DropCompProps) {
    const theme = useMantineTheme();

    function reciveFile(files: FileWithPath[]){

        if(!files){
            return
        }

        const reader = new FileReader();
        reader.onload = async ({ target }) => {

            const csv = Papa.parse(target.result as any, { header: true });
            const parsedData = csv?.data;

            // const columnsKeys = Object.keys(parsedData[0]);

            // console.log(columnsKeys);
            // console.log(parsedData);

            !!props.setData && props.setData(parsedData as CSVDataArray)
        };

        reader.readAsText(files[0]);
    }

    return (
        <Box>
        <Text mb={6} c="dimmed" fz={12}>Import CSV</Text>
        <Dropzone
            onDrop={(files) => reciveFile(files)}
            onReject={(files) => console.log('rejected files', files)}
            maxSize={3 * 1024 ** 180}
            accept={['text/csv']}
            multiple={false}
            {...props}
        >
            <Group position="center" spacing="xl" style={{ minHeight: rem(100), pointerEvents: 'none' }}>
                <Dropzone.Accept>
                    <IconUpload
                        size="3.2rem"
                        stroke={1.5}
                        color={theme.colors[theme.primaryColor][theme.colorScheme === 'dark' ? 4 : 6]}
                    />
                </Dropzone.Accept>
                <Dropzone.Reject>
                    <IconX
                        size="3.2rem"
                        stroke={1.5}
                        color={theme.colors.red[theme.colorScheme === 'dark' ? 4 : 6]}
                    />
                </Dropzone.Reject>
                <Dropzone.Idle>
                    <IconPhoto size="3.2rem" stroke={1.5} />
                </Dropzone.Idle>

                <div>
                    <Text size="xl" inline>
                        Drag csv here or click to select file
                    </Text>
                    <Text size="sm" color="dimmed" inline mt={7}>
                        Attach a csv file, and should not exceed 180mb
                    </Text>
                </div>
            </Group>
        </Dropzone>    
        </Box>
    );
}
