import { elem } from "./tools.js"

function generatePlayfield() {
	const playfieldWidth = 6; // number of columns
	const playfieldHeight = 12; // number of rows
	const boxSize = 40; // size of each box in pixels
	const colors = ["red", "green", "blue", "yellow"]; // array of available box colors

	// create the SVG element and set its attributes
	const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
	svg.setAttribute("width", playfieldWidth * boxSize);
	svg.setAttribute("height", playfieldHeight * boxSize);
	
	// create a group element to hold all the boxes
	const boxGroup = document.createElementNS("http://www.w3.org/2000/svg", "g");
	svg.appendChild(boxGroup);
	
	// generate the boxes and add them to the group
	for (let y = 0; y < playfieldHeight; y++) {
		for (let x = 0; x < playfieldWidth; x++) {
			const box = document.createElementNS("http://www.w3.org/2000/svg", "rect");
			box.setAttribute("x", x * boxSize);
			box.setAttribute("y", y * boxSize);
			box.setAttribute("width", boxSize);
			box.setAttribute("height", boxSize);
			box.setAttribute("fill", colors[Math.floor(Math.random() * colors.length)]);
			boxGroup.appendChild(box);
		}
	}
	
	return svg;
}

// example usage
const playfield = generatePlayfield();
document.body.appendChild(playfield);