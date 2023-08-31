export function generateFrame(data: Record<string, string>[]){
    if(figma.currentPage.selection[0] && (figma.currentPage.selection[0] as FrameNode).children){
        console.log("HHEELLOOO")
        console.log(data);
    }
}