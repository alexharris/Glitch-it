// Import functions for generating a palette from an image
import * as utils from "./modules/utils";
// @ts-ignore
import * as glitch from "glitch-canvas";





// Turn on the UI
figma.showUI(__html__, { themeColors: true, height: 600, width: 400 })


function selectImage() {
  var selectedImage = utils.getSelectedImage();
  
  selectedImage.then((value) => {
    
    if (value !== undefined) {
      // Send the image to the UI
      console.log(value)
      figma.ui.postMessage({ type: 'show-image-in-ui', imageDetails: value });
    } else {
      figma.ui.postMessage({ type: 'no-image-selected'});
    }
  });
}
// get the currently selected image on load
selectImage();
  
  // get the currently selected image on selection change
figma.on('selectionchange', () => {
  selectImage();
})


// ---------------
//  RECEIVE MESSAGES
// ---------------

// Check for a message from the UI
figma.ui.onmessage = async msg => {
  

}









