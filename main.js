import { elem, hyperIter } from "./tools.js"
import { generateBlobStyles } from "./style.js"

const generatePlayfield = ({
	size = [12, 6],
	colors = 4
}) => elem ({
	tag: 'svg', svg: true, cls: 'playfield',
	attr: {
		viewBox: "0 0 " + size[1] + ' ' + size[0]
	},
	cssVar: {colors},
	mixin: {
		gems: new Array (size[0] * size [1]),
		size, colors
	}
})

const newGem = ({field, y, x, color}) =>
	elem ({
		tag: 'path', svg: true, cls: 'gem',
		cssVar: {
			x, y,
			color: color == 'random' ?
				Math.floor(Math.random() * field.colors) :
				color
		}
	})

const fillPlayfield = field => {
	const {size} = field

	hyperIter (size, ([y, x]) => {
		const idx = (y + size [0] * x)
		if (!field.gems [idx]) {
			const gem = newGem ({field, y, x, color: 'random'})
			field.gems[idx] = gem
			field.appendChild (gem)
		}
	})

	return field
}

// example usage
const playfield = fillPlayfield (generatePlayfield({}));
document.body.appendChild(playfield);
generateBlobStyles ()