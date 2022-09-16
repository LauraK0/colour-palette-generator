function createHexCode() {
    const newHexCode = '#' + Math.floor(Math.random() * (0xffffff + 1))
    .toString(16)
    .padStart(6, '0') 
    return newHexCode.toUpperCase();
}

function generateColourPalette(){
    const colourSwatch = document.querySelectorAll(".colour-swatch");
    const colourSwatchHexCode = document.querySelectorAll(".hex-code")
    for (let i = 0; i < colourSwatch.length; i++) {
        const randomColour = createHexCode();
        if (colourSwatch[i].dataset.status === "unlocked") {
        colourSwatch[i].style.background = randomColour;
        colourSwatchHexCode[i].textContent = randomColour;
        colourSwatch[i].dataset.hexcode = `${randomColour}`;
        }
    }
}

function copyHexToClipBoard(colour){
    const hexCode = colour.parentElement.parentElement.parentElement.dataset.hexcode;
    navigator.clipboard.writeText(hexCode);
}


// Generates a new colour palette as soon as page is loaded.
document.addEventListener("DOMContentLoaded", generateColourPalette);

// Generates a new colour palette when button is pressed
const startButton = document.querySelector(".start-button");
startButton.addEventListener("click", generateColourPalette)

// Generates a new colour palette when user hits spacebar.
document.addEventListener("keydown", (e) => {
    if (e.code.toLowerCase() === "space") {
      for (let i = 0; i < colours.length; i++) {
        colours[i].generateHex();
      }
    }
  });
