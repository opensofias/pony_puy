import { elem, hyperIter } from "./tools.js"

const generatePlayfield = ({
	size = [12, 6],
	colors = ["red", "green", "blue", "yellow"]
}) => {
	const boxSize = 40; // size of each box in pixels

	// generate the boxes
	const boxes = hyperIter (size, ([y, x]) => {
		return elem ({
			tag: 'rect', svg: true,
			attr: {
				x: x * boxSize,
				y: y * boxSize,
				width: boxSize,
				height: boxSize,
				fill: colors[Math.floor(Math.random() * colors.length)],
			}
		})
	})

	console.log (boxes)

	return elem ({
		tag: 'svg', svg: true,
		attr: {
			width: size[1] * boxSize,
			height: size[0] * boxSize
		},
		content: boxes,
		mixin: {boxes, size, colors}
	});
}

// example usage
const playfield = generatePlayfield({});
document.body.appendChild(playfield);