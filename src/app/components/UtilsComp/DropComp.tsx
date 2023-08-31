import React, { useEffect, useState }  from 'react';

import { Group, Text, useMantineTheme, rem } from '@mantine/core';
import { IconUpload, IconPhoto, IconX } from '@tabler/icons-react';
import { Dropzone, DropzoneProps, FileWithPath } from '@mantine/dropzone';

import Papa from "papaparse";
import FortuneSheetComp from './FortuneSheetComp';

export type CSVDataArray = Record<string, string>[]

export function DropComp(props: Partial<DropzoneProps>) {
    const theme = useMantineTheme();

    // const [file, setFile] = useState("");
    const [data, setData] = useState<CSVDataArray>([]);
    
    function reciveFile(files: FileWithPath[]){

        if(!files){
            return
        }

        console.log(files[0]);

        const reader = new FileReader();
 
        // Event listener on reader when the file
        // loads, we parse it and set the data.
        reader.onload = async ({ target }) => {

            const csv = Papa.parse(target.result as any, { header: true });
            const parsedData = csv?.data;

            const columnsKeys = Object.keys(parsedData[0]);

            console.log(columnsKeys);
            console.log(parsedData);

            setData(parsedData as CSVDataArray)
        };

        reader.readAsText(files[0]);
    }

    useEffect(() => {
        console.log("DATA", data);
        // data.length >= 1 && arrayToCellData(data);
    }, [data]);


    return (
        <>
        <Dropzone
            onDrop={(files) => reciveFile(files)}
            onReject={(files) => console.log('rejected files', files)}
            maxSize={3 * 1024 ** 12}
            accept={['text/csv']}
            multiple={false}
            {...props}
        >
            <Group position="center" spacing="xl" style={{ minHeight: rem(220), pointerEvents: 'none' }}>
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
                        Drag images here or click to select files
                    </Text>
                    <Text size="sm" color="dimmed" inline mt={7}>
                        Attach a csv file, and should not exceed 5mb
                    </Text>
                </div>
            </Group>
        </Dropzone>
        
        <FortuneSheetComp data={data}/>
        
        </>
    );
}
