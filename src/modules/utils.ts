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


export async function glitch1(imageData: { data: Uint8Array; height: number; width: number }) {
  console.log('glitch it')
  const { data, width, height } = imageData;
  const output = { data: new Uint8ClampedArray(width * height * 4), width, height };

  // Copy original data
  for (let i = 0; i < data.length; i++) {
    output.data[i] = data[i];
  }

  // 1. RGB Channel Shift (horizontal offset for each channel)
  for (let y = 0; y < height; y++) {
    // Randomly decide to shift this row
    if (Math.random() < 0.2) {
      const shift = Math.floor(Math.random() * 20) - 10; // -10 to +10 pixels
      for (let x = 0; x < width; x++) {
        const srcIdx = (y * width + x) * 4;
        const dstX = Math.min(width - 1, Math.max(0, x + shift));
        const dstIdx = (y * width + dstX) * 4;

        // Shift only the red channel for a glitchy look
        output.data[dstIdx] = data[srcIdx];
        // Optionally, shift green and blue differently for more effect
        // output.data[dstIdx + 1] = data[srcIdx + 1];
        // output.data[dstIdx + 2] = data[srcIdx + 2];
      }
    }
  }

  // 2. Random horizontal line offset (datamosh effect)
  for (let i = 0; i < 5; i++) {
    const y = Math.floor(Math.random() * height);
    const lineOffset = Math.floor(Math.random() * 30) - 15;
    for (let x = 0; x < width; x++) {
      const srcIdx = (y * width + x) * 4;
      const dstX = Math.min(width - 1, Math.max(0, x + lineOffset));
      const dstIdx = (y * width + dstX) * 4;
      for (let c = 0; c < 4; c++) {
        output.data[dstIdx + c] = data[srcIdx + c];
      }
    }
  }


  return output;  

} 