import { elem, hyperIter } from "./tools.js"

const generatePlayfield = ({
	size = [12, 6],
	colors = ["red", "green", "blue", "yellow"]
}) => {
	// generate the boxes
	const gems = hyperIter (size, ([y, x]) => {
		return elem ({
			tag: 'path', svg: true,
			attr: {
				fill: colors[Math.floor(Math.random() * colors.length)],
			},
			style: { '--x': x, '--y': y, }
		})
	})

	return elem ({
		tag: 'svg', svg: true,
		attr: {
			viewBox: "0 0 " + size[1] + ' ' + size[0]
		},
		content: gems,
		mixin: {boxes: gems, size, colors}
	});
}

// example usage
const playfield = generatePlayfield({});
document.body.appendChild(playfield);