import { MsgTypes } from "./interface";
import { checkAllNecessaryKeyExistInFrame, generateFrame } from "./utils/generateFrame";

figma.showUI(__html__, {
    width: 800,
    height: 700
});

figma.on("selectionchange", async () => {

    await figma.loadFontAsync({ family: "Inter", style: "Regular" });

    try {
        
        if(figma.currentPage.selection[0].type === "FRAME" || figma.currentPage.selection[0].type === "GROUP"){

            const cols = checkAllNecessaryKeyExistInFrame();
            
            figma.ui.postMessage({
                type: 'is-frame-group-selected',
                data: {
                    status: true,
                    cols: cols
                },
            });

            return
        }
        
        figma.ui.postMessage({
            type: 'is-frame-group-selected',
            data: {
                status: false,
                cols: []
            },
        });
        
    }
    catch (error) {
        figma.ui.postMessage({
            type: 'is-frame-group-selected',
            data: {
                status: false,
                cols: []
            },
        });
    }
    
})

figma.ui.onmessage = (msg: MsgTypes) => {

    if (msg.type === 'generate-frame') {
        generateFrame(msg.data.data, msg.data.name)
    }

    // figma.closePlugin();
};
