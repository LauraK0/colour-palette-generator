//create colour object

class Colour {
	constructor(hex, element) {
		this.hex = hex;
		this.element = element;
		this.locked = false;
	}

	setHex(hex) {
		this.hex = hex;
		this.element.style.backgroundColor = hex;
		this.element.querySelector(".hex-code").innerHTML = hex; //Sets paragraphs with hex-code class as the generated hex code
	}

	setLocked(locked) {
		this.locked = locked;

		if (locked) {
			this.element
				.querySelector(".lock-button").classList.add("is-locked");

			this.element
				.querySelector("i").classList = "fa-solid fa-lock";
		} else {
			this.element
				.querySelector(".lock-button").classList.remove("is-locked");

			this.element
				.querySelector("i").classList = "fa-solid fa-unlock";
		}
    document.activeElement.blur();
	}

	toggleLocked() {
		this.setLocked(!this.locked);
	}

	generateHex() {
		if (this.locked) {
			return
		}

    const newHexCode = '#' + Math.floor(Math.random() * (0xffffff + 1))
    .toString(16)
    .padStart(6, '0') 
    this.setHex(newHexCode);
	}

  copyToClipboard() {
    const hexCodeTitle = this.element.querySelector(".hex-code").innerHTML;
    console.log(hexCodeTitle)

    navigator.clipboard.writeText(hexCodeTitle).then(() => {
      // Alert the user that the action took place.
      // Nobody likes hidden stuff being done under the hood!
      alert("Copied to clipboard");
    });

    this.element.classList.add("copied");
    setTimeout(() => {
      //This variable removes the class copied from the element after a duration 1000ms
      this.element.classList.remove("copied");
    }, 10000);
  }
}


//end colour object

const colour_elements = document.querySelectorAll('.colour-palette .colour-swatch');
const colours = [];

for (let i = 0; i < colour_elements.length; i++) {
	const colour_element = colour_elements[i];
	

	const hexCodeTitle = colour_element.querySelector(".hex-code");
	const lockToggle = colour_element.querySelector(".lock-button");
	const copyButton = colour_element.querySelector(".copy-icon");
  	const refreshButton = colour_element.querySelector(".refresh-button");

	const hex = hexCodeTitle.value;
	const colour = new Colour(hex, colour_element);

	hexCodeTitle.addEventListener('.hex-code', (e) => colour.setHex(e.target.value));
	lockToggle.addEventListener('click', () => colour.toggleLocked());
	copyButton.addEventListener('click', () => colour.copyToClipboard());
 	refreshButton.addEventListener('click', () => colour.generateHex());

	colour.generateHex();
	colours.push(colour);
}

//generate palette by clicking button
document.querySelector(".start-button").addEventListener("click", () => {
	for (let i = 0; i < colours.length; i++) {
		colours[i].generateHex();
	}
}); 

//generate palette by pressing spacebar
document.addEventListener("keydown", (e) => {
  if (e.code.toLowerCase() === "space") {
    for (let i = 0; i < colours.length; i++) {
      colours[i].generateHex();
    }
  }
})


//dropdown menu
function dropdownMenu() {
	document.getElementById("myDropdown").classList.toggle("show");
	document.activeElement.blur();
  }
  

  function download(filename, content) {
    // It works on all HTML5 Ready browsers as it uses the download attribute of the <a> element:
    const element = document.createElement('a');
  
    //A blob is a data type that can store binary data
    // "type" is a MIME type
    // It can have a different value, based on a file you want to save
    const blob = new Blob([content], { type: 'plain/text' });
  
    //createObjectURL() static method creates a DOMString containing a URL representing the object given in the parameter.
    const fileUrl = URL.createObjectURL(blob);
  
    //setAttribute() Sets the value of an attribute on the specified element.
    element.setAttribute('href', fileUrl); //file location
    element.setAttribute('download', filename); // file name
    element.style.display = 'none';
  
    //use appendChild() method to move an element from one element to another
    document.body.appendChild(element);
    element.click();
  
    //The removeChild() method of the Node interface removes a child node from the DOM and returns the removed node
    document.body.removeChild(element);
  };
  
  window.onload = () => {
    document.getElementById('download').
    addEventListener('click', e => {
  
    //The value of the file name input box
    const filename = "colours";

    //The value of what has been input in the textarea
	let content = '';

	colours.forEach(colour => {
		content += colour["hex"];
		content += "\n";
	  }); 

      // The && (logical AND) operator indicates whether both operands are true. If both operands have nonzero values, the result has the value 1 . Otherwise, the result has the value 0.
  
      if (filename && content) {
        download(filename, content);
      }
    });
  };