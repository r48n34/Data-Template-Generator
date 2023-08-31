import React from 'react';
import { Grid, Text } from '@mantine/core';
import { CSVDataArray } from '../../interface/generatInterface';

type DetailsShowsCompProps = {
    data: CSVDataArray;
}

function DetailsShowsComp({ data }: DetailsShowsCompProps){

    if(!Array.isArray(data) || data.length <= 0){
       return (<></>) 
    }

    return (
        <>
        <Grid>
            <Grid.Col span={12}>
                <Text color="dimmed" size="sm">Headers: (Total {Object.keys(data[0]).length})</Text>
                <Text size="sm">{Object.keys(data[0]).join(", ")}</Text>
            </Grid.Col>

            <Grid.Col span={4}>
                <Text color="dimmed" size="sm">Record count</Text>
                <Text size="sm">{data.length}</Text>
            </Grid.Col>

            <Grid.Col span={4}>

            </Grid.Col>
        </Grid>
        </>
    )
}
    
export default DetailsShowsComp
