// Get Selected Image
// All this does is figure out if/which image is selected

export async function getSelectedImage() {
  // console.log('get selected image')
  // Get the selected nodes
  const selectedNodes = figma.currentPage.selection;
  // Check if a node is selected
  if (selectedNodes.length > 0) {
    const node = selectedNodes[0];
    // Check if the node is an image
    if ('fills' in node) {
      const fills = node.fills as Paint[];
      // Check if the fill type is IMAGE
      if (fills[0].type === 'IMAGE') {
        
        // Get the image hash
        const imageHash = fills[0].imageHash;
        // Get the image
        const image = imageHash ? figma.getImageByHash(imageHash) : null;
        
        if (image) {
          // get image bytes from getBytesAsync
          // const size = await image.getSizeAsync();
          const bytes = await image.getBytesAsync();
          // This returns a promise to code.ts
          
          return { imageBytes: bytes, height: node.height, width: node.width };
        } else {
          console.log('no image selected. error needed')
        }
      }
    }
  }
}

