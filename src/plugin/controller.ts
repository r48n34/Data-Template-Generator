figma.showUI(__html__, {
    width: 500,
    height: 700
});

figma.on("selectionchange", async () => {

    await figma.loadFontAsync({ family: "Inter", style: "Regular" })
    // console.log(figma.currentPage.selection[0]);
    
    if(figma.currentPage.selection[0] && (figma.currentPage.selection[0] as FrameNode).children){
        console.log( (figma.currentPage.selection[0] as FrameNode).children);

        
        const copyNode = figma.currentPage.selection[0].clone();

        figma.currentPage.selection = []

        copyNode.y = copyNode.y + copyNode.height + 100;

        for(let v of (copyNode as FrameNode).children){
            if(v.type === "TEXT"){
                v.characters = "Peter"
            }
        }

        
        figma.currentPage.appendChild(copyNode);
    }
    
})

figma.ui.onmessage = (msg) => {
    if (msg.type === 'create-rectangles') {
        const nodes = [];

        for (let i = 0; i < msg.count; i++) {
            const rect = figma.createRectangle();
            rect.x = i * 150;
            rect.fills = [{ type: 'SOLID', color: { r: 1, g: 0.5, b: 0 } }];
            figma.currentPage.appendChild(rect);
            nodes.push(rect);
        }

        figma.currentPage.selection = nodes;
        figma.viewport.scrollAndZoomIntoView(nodes);

        // This is how figma responds back to the ui
        figma.ui.postMessage({
            type: 'create-rectangles',
            message: `Created ${msg.count} Rectangles`,
        });
    }

    // figma.closePlugin();
};
