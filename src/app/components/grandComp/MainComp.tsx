import React, { useState } from "react";
import { Button, Container, Grid, Group, Space } from "@mantine/core";
import { DropComp } from "../UtilsComp/DropComp";
import FortuneSheetComp from "../UtilsComp/FortuneSheetComp";
import TimeLineGuide from "../UtilsComp/TimeLineGuide";
import DetailsShowsComp from "../UtilsComp/DetailsShowsComp";
import { CSVDataArray, CheckNodeTextType } from "../../interface/generatInterface";

interface MainCompProps {
    isFrameGroupSelected: CheckNodeTextType
}

function MainComp({ isFrameGroupSelected }:MainCompProps) {

    const [data, setData] = useState<CSVDataArray>([]);
    const activeNumber = Array.isArray(data) && data.length >= 1 ? 1 : 0;

    const onCreate = () => {
        parent.postMessage({ pluginMessage: { type: 'generate-frame', data: data } }, '*');
    };

    return (
        <>
            <Container>
                <Space h="md" />
                <Space h="md" />

                <Grid>
                    <Grid.Col span={3}>
                        <TimeLineGuide activeNumber={activeNumber} />
                    </Grid.Col>

                    <Grid.Col span={9}>
                        <DropComp setData={setData} />
                        <Space h="md" />

                        <FortuneSheetComp data={data} />
                        <Space h="md" />

                        <DetailsShowsComp data={data} frameInfo={isFrameGroupSelected}/>
                        { Array.isArray(data) && data.length >= 1 && (
                            <Group position="right">
                                <Button
                                    onClick={() => onCreate()}
                                    disabled={
                                           !isFrameGroupSelected.status
                                        || Object.keys(data[0]).map( v => "@" + v).filter(x => !isFrameGroupSelected.cols.includes(x)).length >= 1
                                    }
                                >
                                    Generate
                                </Button>
                            </Group>
                        )}

                    </Grid.Col>
                </Grid>
                
            </Container>
        </>
    )
}

export default MainComp
