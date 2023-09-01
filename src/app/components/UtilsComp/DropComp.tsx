import React from 'react';

import { Group, Text, useMantineTheme, rem, Box } from '@mantine/core';
import { IconUpload, IconPhoto, IconX } from '@tabler/icons-react';
import { Dropzone, DropzoneProps, FileWithPath } from '@mantine/dropzone';

import Papa from "papaparse";
import XLSX from "xlsx";
import toast from 'react-hot-toast';

import { CSVDataArray } from '../../interface/generatInterface';

interface DropCompProps extends Partial<DropzoneProps> {
    setData: Function
}

export function DropComp(props: DropCompProps) {
    const theme = useMantineTheme();

    async function reciveFile(files: FileWithPath[]){

        if(!files){
            return
        }

        try {
            
            const reader = new FileReader();
            reader.onload = async ({ target }) => {
    
                const csv = Papa.parse(target.result as any, { header: true });
                const parsedData = csv?.data;
                // const columnsKeys = Object.keys(parsedData[0]);
    
                !!props.setData && props.setData(parsedData as CSVDataArray);
                toast.success("success to upload", { position: "top-right" });
            };
    
            if(files[0].type === "text/csv"){
                reader.readAsText(files[0]);
            }
            else if(files[0].type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"){

                try {   

                    const data = await files[0].arrayBuffer();
                    const workbook = XLSX.read(data);

                    const first_worksheet = workbook.Sheets[workbook.SheetNames[0]];
                    const result:object[] = XLSX.utils.sheet_to_json(first_worksheet, { header: 0, raw:true });
        
                    !!props.setData && props.setData(result as CSVDataArray);
        
                    toast.success("success to upload", { position: "top-right" });
                }
                catch (error: any) {
                    toast.error(error.massage, { position: "top-right" });
                    return
                }
            }
        }
        catch (error: any) {
            toast.error(error.massage, { position: "top-right" });
            return
        }


    }

    return (
        <Box>
        <Text mb={6} c="dimmed" fz={12}>Import Data</Text>
        <Dropzone
            onDrop={(files) => reciveFile(files)}
            onReject={() => toast.error('rejected files')}
            maxSize={3 * 1024 ** 300}
            accept={['text/csv', "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"]}
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
                        Drag file here or click to select
                    </Text>
                    <Text size="sm" color="dimmed" inline mt={7}>
                        Accepted: CSV / XLSX file, smaller than 300mb
                    </Text>
                </div>
            </Group>
        </Dropzone>    
        </Box>
    );
}
