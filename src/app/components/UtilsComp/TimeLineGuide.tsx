import React from "react";
import { Timeline, Text } from "@mantine/core";
import { IconGitBranch, IconGitCommit, IconGitPullRequest } from "@tabler/icons-react";

type TimeLineGuideProps = {
    activeNumber: number;
}

function TimeLineGuide({ activeNumber = 0 }: TimeLineGuideProps) {
    return (
        <>
            <Timeline active={activeNumber} bulletSize={24} lineWidth={2}>
                <Timeline.Item bullet={<IconGitBranch size={12} />} title="Import CSV">
                    { activeNumber === 0 && <Text color="dimmed" size="sm">Import csv file from left section</Text> }
                </Timeline.Item>

                <Timeline.Item bullet={<IconGitCommit size={12} />} title="Adjust Frame Text">
                    { activeNumber === 1 && <Text color="dimmed" size="sm">See if the CSV data is valid</Text> }
                </Timeline.Item>

                <Timeline.Item title="Click generate" bullet={<IconGitPullRequest size={12} />} lineVariant="dashed">
                    { activeNumber === 1 && <Text color="dimmed" size="sm">Click generate</Text> }
                </Timeline.Item>
            </Timeline>
        </>
    )
}

export default TimeLineGuide
