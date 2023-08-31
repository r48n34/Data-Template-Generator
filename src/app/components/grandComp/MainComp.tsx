import React, { useState } from "react";
import { Button, Container, Grid, Group, Space } from "@mantine/core";
import { DropComp } from "../UtilsComp/DropComp";
import FortuneSheetComp from "../UtilsComp/FortuneSheetComp";
import TimeLineGuide from "../UtilsComp/TimeLineGuide";
import DetailsShowsComp from "../UtilsComp/DetailsShowsComp";
import { CSVDataArray } from "../../interface/generatInterface";

interface MainCompProps {
    isFrameGroupSelected: boolean
}

function MainComp({ isFrameGroupSelected }:MainCompProps) {

    const [data, setData] = useState<CSVDataArray>([]);
    const activeNumber = Array.isArray(data) && data.length >= 1 ? 1 : 0;

    const onCreate = () => {
        // const count = parseInt(textbox.current.value, 10);
        parent.postMessage({ pluginMessage: { type: 'generate-frame', data: data } }, '*');
    };

    return (
        <>
            <Container>
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
                        <DetailsShowsComp data={data} />

                        { Array.isArray(data) && data.length >= 1 && (
                            <Group position="right">
                                <Button
                                    onClick={() => onCreate()}
                                    disabled={!isFrameGroupSelected}
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
