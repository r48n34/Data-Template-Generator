import { MsgTypes } from "./interface";
import { checkAllNecessaryKeyExistInFrame, generateFrame } from "./utils/generateFrame";

figma.showUI(__html__, {
    width: 800,
    height: 600
});

figma.on("selectionchange", async () => {

    await figma.loadFontAsync({ family: "Inter", style: "Regular" });

    try {

        console.log("HEELLOOOOOO")
        console.log(figma.currentPage.selection[0].type)
        
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

    
    // if(figma.currentPage.selection[0] && (figma.currentPage.selection[0] as FrameNode).children){
    //     console.log( (figma.currentPage.selection[0] as FrameNode).children);

        
    //     const copyNode = figma.currentPage.selection[0].clone();

    //     figma.currentPage.selection = []

    //     copyNode.y = copyNode.y + copyNode.height + 100;

    //     for(let v of (copyNode as FrameNode).children){
    //         if(v.type === "TEXT"){
    //             v.characters = "Peter"
    //         }
    //     }

        
    //     figma.currentPage.appendChild(copyNode);
    // }
    
})

figma.ui.onmessage = (msg: MsgTypes) => {

    if (msg.type === 'generate-frame') {
        generateFrame(msg.data)
    }

    // if (msg.type === 'create-rectangles') {
    //     const nodes = [];

    //     for (let i = 0; i < msg.count; i++) {
    //         const rect = figma.createRectangle();
    //         rect.x = i * 150;
    //         rect.fills = [{ type: 'SOLID', color: { r: 1, g: 0.5, b: 0 } }];
    //         figma.currentPage.appendChild(rect);
    //         nodes.push(rect);
    //     }

    //     figma.currentPage.selection = nodes;
    //     figma.viewport.scrollAndZoomIntoView(nodes);

    //     // This is how figma responds back to the ui
    //     figma.ui.postMessage({
    //         type: 'create-rectangles',
    //         message: `Created ${msg.count} Rectangles`,
    //     });
    // }

    // figma.closePlugin();
};
