import React from 'react';
import { Grid, Text, Tooltip } from '@mantine/core';
import { CSVDataArray, CheckNodeTextType } from '../../interface/generatInterface';

type DetailsShowsCompProps = {
    data: CSVDataArray;
    frameInfo: CheckNodeTextType
}

function DetailsShowsComp({ data, frameInfo }: DetailsShowsCompProps){

    if(!Array.isArray(data) || data.length <= 0){
       return (<></>) 
    }

    const missingStuff = Object.keys(data[0]).map( v => "@" + v).filter(x => !frameInfo.cols.includes(x))

    return (
        <>
        <Grid>
            <Grid.Col span={8}>
                <Text color="dimmed" size="sm">Headers: (Total {Object.keys(data[0]).length})</Text>
                <Text size="sm">{Object.keys(data[0]).join(", ")}</Text>
            </Grid.Col>

            <Grid.Col span={4}>
                <Text color="dimmed" size="sm">Record count</Text>
                <Text size="sm">{data.length}</Text>
            </Grid.Col>

            <Tooltip label="Rename your text node starting with @xxx">
            <Grid.Col span={8}>

                <Text size="sm" c={ missingStuff.length >= 1 ? "red" : "dimmed"}>Missing Text Node</Text>

                { missingStuff.length >= 1 
                    ? (<Text size="sm">{missingStuff.join(", ")}</Text>)
                    : (<Text size="sm">Good, nothing missing</Text>)
                }

            </Grid.Col>
            </Tooltip>

            <Tooltip label="Select a Frame from left">
            <Grid.Col span={4}>
                <Text c={ frameInfo.status ? "dimmed" : "red" } size="sm">Frame Selected</Text>
                <Text size="sm">{frameInfo.status ? "Yes" : "No"}</Text>
            </Grid.Col>
            </Tooltip>

        </Grid>
        </>
    )
}
    
export default DetailsShowsComp
