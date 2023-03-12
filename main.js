import { elem } from "./tools.js"

const generatePlayfield = ({
	size = [12, 6],
	colors = ["red", "green", "blue", "yellow"]
}) => {
	const boxSize = 40; // size of each box in pixels

	// create the SVG element and set its attributes
	const svg = elem ({
		tag: 'svg', svg: true,
		attr: {
			width: size[1] * boxSize,
			height: size[0] * boxSize
		}
	})
		
	// generate the boxes and add them to the group
	for (let y = 0; y < size[0]; y++) {
		for (let x = 0; x < size[1]; x++) {
			const box = elem ({
				tag: 'rect', svg: true,
				attr: {
					x: x * boxSize,
					y: y * boxSize,
					width: boxSize,
					height: boxSize,
					fill: colors[Math.floor(Math.random() * colors.length)],
				}
			})
			svg.appendChild(box);
		}
	}
	
	return svg;
}

// example usage
const playfield = generatePlayfield({});
document.body.appendChild(playfield);