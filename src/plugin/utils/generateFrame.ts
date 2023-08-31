
export function checkAllNecessaryKeyExistInFrame(): string[]{

    const allTextNode = (figma.currentPage.selection[0] as FrameNode | GroupNode).findAll(node => {
        return node.type === "TEXT"
    })

    return allTextNode.map( v => v.name || "none" );
}

export function generateFrame(data: Record<string, string>[], name: string){

    const columnsKeys: string[] = Object.keys(data[0]);
    const copyNode = figma.currentPage.selection[0].clone();
    figma.currentPage.selection = []
    
    let oldX = [1,2,3,4,5].map( v => copyNode.x + ( (copyNode.width + 100) * v) + 100);
    let oldY = copyNode.y;

    for(let i = 0; i < data.length; i ++){
        const newCopy = copyNode.clone() as FrameNode | GroupNode;

        // For y pol
        newCopy.x = oldX[i % oldX.length];

        if(i % 5 === 0){
            newCopy.y = oldY + newCopy.height + 120;
        }
        else{
            newCopy.y = oldY;
        }

        // Entire document nodes search
        const allTextNode = newCopy.findAll(node => {
            return node.type === "TEXT"
        })

        for(let v of allTextNode){
            const rawName = v.name.replace("@", "");

            if(v.type === "TEXT" && v.name && columnsKeys.includes(rawName)){
                v.characters = data[i][rawName]
            }
        }

        newCopy.name = data[i][name]

        figma.currentPage.appendChild(newCopy);
        oldY = newCopy.y
    }

    figma.notify(`[CSV] Success to generate ${data.length} templates`);
}