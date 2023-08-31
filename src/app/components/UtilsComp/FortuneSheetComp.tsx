import React, { useEffect, useRef }  from 'react';
import { Workbook, WorkbookInstance } from "@fortune-sheet/react";
import { Box, Text } from '@mantine/core';
import { CSVDataArray } from '../../interface/generatInterface';

import "@fortune-sheet/react/dist/index.css"

type FortuneSheetCompProps = {
    data: CSVDataArray;
}

function FortuneSheetComp({ data }: FortuneSheetCompProps){

    const ref = useRef<WorkbookInstance>(null);

    useEffect(() => {
        arrayToCellData(data);
    }, [data]);

    function arrayToCellData(data: CSVDataArray){

        if(!Array.isArray(data) || data.length <= 0){
            return []
        }

        ref.current.deleteRowOrColumn("column", 0, 99999)

        let result = [];

        const columnsKeys = Object.keys(data[0]);

        for(let i = 0; i < columnsKeys.length; i ++){
            result.push({
                "row": 0,
                "col": i,
                "val": columnsKeys[i]
            })
        }

        for(let i = 0; i < data.length; i ++){
            for(let j = 0; j < columnsKeys.length; j ++){
                result.push({
                    "row": i + 1,
                    "col": j,
                    "val": data[i][columnsKeys[j]]
                })
            }
        }

        for(let v of result){
            ref.current.setCellValue(v.row, v.col, v.val)
        }

        ref.current.freeze("row", { row: 0, column: 0 })
    }

    return (
        <>
        { data && Array.isArray(data) && data.length >= 1 &&  (
            <>
            <Text mb={6} c="dimmed" fz={12}>Sheet View (*View only, changes will NOT apply to generation)</Text>
            <Box style={{ height: "220px" }}>
                <Workbook
                    ref={ref}
                    data={[{ name: 'Sheet1', celldata: [] }]}
                    showToolbar={false}
                    showSheetTabs={false}
                    showFormulaBar={false}
                />
            </Box>
            </>
        )}
        </>
    )
}
    
export default FortuneSheetComp
