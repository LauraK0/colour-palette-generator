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

    navigator.clipboard.writeText(hexCodeTitle);   // Copy the text inside the text field
    alert("Copied the text: " + hexCodeTitle);  // Alert the copied text

    this.element.classList.add("copied");
    setTimeout(() => {
      //This variable removes the class copied from the element after a duration 1000ms
      this.element.classList.remove("copied");
    }, 1000);
  }
}

//end colour object



const colour_elements = document.querySelectorAll('.colour-palette .colour-swatch');

const colours = [];

for (let i = 0; i < colour_elements.length; i++) {
	const colour_element = colour_elements[i];

	const hexCodeTitle = colour_element.querySelector(".hex-code");
	const lock_toggle = colour_element.querySelector(".lock-button");
	const copy_btn = colour_element.querySelector(".copy-icon");

	const hex = hexCodeTitle.value;
	const colour = new Colour(hex, colour_element);

	hexCodeTitle.addEventListener('.hex-code', (e) => colour.setHex(e.target.value));
	lock_toggle.addEventListener('click', () => colour.toggleLocked());
	copy_btn.addEventListener('click', () => colour.copyToClipboard());

	colour.generateHex();
	colours.push(colour);
}


document.querySelector(".start-button").addEventListener("click", () => {
	for (let i = 0; i < colours.length; i++) {
		colours[i].generateHex();
	}
});

document.addEventListener("keydown", (e) => {
  if (e.code.toLowerCase() === "space") {
    for (let i = 0; i < colours.length; i++) {
      colours[i].generateHex();
    }
  }
})


