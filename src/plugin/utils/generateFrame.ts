
export function checkAllNecessaryKeyExistInFrame(): string[]{

    const allTextNode = (figma.currentPage.selection[0] as FrameNode | GroupNode).findAll(node => {
        return node.type === "TEXT"
    })

    return allTextNode.map( v => v.name || "none" );
}

export function generateFrame(data: Record<string, string>[]){

    const columnsKeys: string[] = Object.keys(data[0]);
    const copyNode = figma.currentPage.selection[0].clone();
    figma.currentPage.selection = []
    
    let oldY = copyNode.y;
    for(let i = 0; i < data.length; i ++){
        const newCopy = copyNode.clone() as FrameNode | GroupNode;

        // For y pol
        newCopy.y = oldY + newCopy.height + 100;

        // Entire document nodes search
        const allTextNode = newCopy.findAll(node => {
            return node.type === "TEXT"
        })

        for(let v of allTextNode){
            const rawName = v.name.replace("@", "");

            if(v.type === "TEXT" && v.name && columnsKeys.includes(rawName)){
                console.log("MATCH")
                v.characters = data[i][rawName]
            }
        }

        figma.currentPage.appendChild(newCopy);
        oldY = newCopy.y
    }
}