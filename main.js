import { elem, hyperIter } from "./tools.js"

const generatePlayfield = ({
	size = [12, 6],
	colors = ["red", "green", "blue", "yellow"]
}) => {
	// generate the boxes
	const boxes = hyperIter (size, ([y, x]) => {
		return elem ({
			tag: 'rect', svg: true,
			attr: {
				x, y,
				width: 1,
				height: 1,
				fill: colors[Math.floor(Math.random() * colors.length)],
			}
		})
	})

	return elem ({
		tag: 'svg', svg: true,
		attr: {
			viewBox: "0 0 " + size[1] + ' ' + size[0]
		},
		content: boxes,
		mixin: {boxes, size, colors}
	});
}

// example usage
const playfield = generatePlayfield({});
document.body.appendChild(playfield);