import React, { useEffect, useState } from "react";
import { Button, Container, Grid, Group, Select, Space, Tooltip } from "@mantine/core";
import { CSVDataArray, CheckNodeTextType } from "../../interface/generatInterface";
import { ErrorBoundary } from "react-error-boundary";

import { DropComp } from "../UtilsComp/DropComp";
import FortuneSheetComp from "../UtilsComp/FortuneSheetComp";
import TimeLineGuide from "../UtilsComp/TimeLineGuide";
import DetailsShowsComp from "../UtilsComp/DetailsShowsComp";
import ErrorComp from "../UtilsComp/ErrorComp";

import { IconFileUnknown, IconUpload } from "@tabler/icons-react";

interface MainCompProps {
    isFrameGroupSelected: CheckNodeTextType
}

function MainComp({ isFrameGroupSelected }:MainCompProps) {

    const [data, setData] = useState<CSVDataArray>([]);
    const [colToRenameFrame, setColToRenameFrame] = useState<string | null>(null);
    const activeNumber = checkActiveNumber();

    function resetFunc(){
        setData([])
    }

    function checkActiveNumber(){
        if(!Array.isArray(data) || data.length <= 0){
            return 0
        }
        if(
            !isFrameGroupSelected.status
            || Object.keys(data[0]).map( v => "@" + v).filter(x => !isFrameGroupSelected.cols.includes(x)).length >= 1)
        {
            return 1
        }

        return 2
    }

    const onCreate = () => {
        parent.postMessage({ 
            pluginMessage:{ 
                type: 'generate-frame', 
                data: { data: data, name: colToRenameFrame }
            }
        }, '*');
    };

    useEffect(() => {
        if(Array.isArray(data) && data.length >= 1){
            setColToRenameFrame(Object.keys(data[0])[0])
        }
    }, [data]);

    return (
        <>
            <ErrorBoundary fallback={<ErrorComp resetFunc={resetFunc}/>}>
            <Container>
                <Grid mt={12}>
                    <Grid.Col span={3}>
                        <TimeLineGuide activeNumber={activeNumber} />
                    </Grid.Col>

                    <Grid.Col span={9}>
                        <DropComp setData={setData} />
                        <Space h="md" />

                        <FortuneSheetComp data={data} />
                        <Space h="md" />

                        <DetailsShowsComp data={data} frameInfo={isFrameGroupSelected}/>
                        <Space h="md" />

                        { Array.isArray(data) && data.length >= 1 && (
                            <>
                            <Select
                                label="Header to rename Frame"
                                placeholder="Pick one"
                                value={colToRenameFrame} onChange={setColToRenameFrame}
                                data={Object.keys(data[0])}
                                required
                            />

                            <Group position="right" mt={24}>
                                
                                <Tooltip label="Ingore the missing attribute and generate">
                                <Button
                                    leftIcon={<IconFileUnknown/>}
                                    variant="light"
                                    onClick={() => onCreate()}
                                    disabled={
                                        !isFrameGroupSelected.status
                                        || Object.keys(data[0])
                                        .map( v => "@" + v)
                                        .filter(x => !isFrameGroupSelected.cols.includes(x))
                                        .length <= 0
                                    }
                                >
                                    Generate with missing 
                                </Button>
                                </Tooltip>

                                <Tooltip label={`Generate ${data.length} items`}>
                                <Button
                                    leftIcon={<IconUpload/>}
                                    variant="light"
                                    color="teal"
                                    onClick={() => onCreate()}
                                    disabled={
                                        !isFrameGroupSelected.status
                                        || Object.keys(data[0])
                                            .map( v => "@" + v)
                                            .filter(x => !isFrameGroupSelected.cols.includes(x))
                                            .length >= 1
                                    }
                                >
                                    Generate
                                </Button>
                                </Tooltip>

                            </Group>
                            </>
                        )}

                    </Grid.Col>
                </Grid>
                
            </Container>
            </ErrorBoundary>
        </>
    )
}

export default MainComp
