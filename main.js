import { elem, hyperIter } from "./tools.js"

const generatePlayfield = ({
	size = [12, 6],
	colors = 4
}) => {
	// generate the boxes
	const gems = hyperIter (size, ([y, x]) => {
		return elem ({
			tag: 'path', svg: true,
			style: {
				'--x': x, '--y': y,
				'--color': Math.floor(Math.random() * colors)
			}
		})
	})

	return elem ({
		tag: 'svg', svg: true,
		attr: {
			viewBox: "0 0 " + size[1] + ' ' + size[0]
		},
		content: gems,
		style: {'--colors': colors},
		mixin: {gems, size, colors}
	});
}

// example usage
const playfield = generatePlayfield({});
document.body.appendChild(playfield);