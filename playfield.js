import { hyperIter, elem } from "./tools.js"

export class Playfield {
	constructor ({
		size = [12, 6],
		colors = 4
	}) {Object.assign (this, {
		element: elem ({
			tag: 'svg', svg: true, cls: 'playfield',
			attr: {
				viewBox: "0 0 " + size[1] + ' ' + size[0]
			},
			cssVar: { colors },
			mixin: { ob: this }
		}),
		gemMap: new Array (size[0] * size [1]).fill (-1),
		size, colors
	})}
	pos2idx ({y, x}) { return y + this.size [0] * x }
	idx2pos (idx) { return {
		y: idx % this.size [0],
		x: Math.floor (idx / this.size [0])
	}}
	newGem ({y, x, color}) {
		color == 'random' && (color = Math.floor(Math.random() * this.colors))
		const pos = this.pos2idx ({y, x})
		if (this.gemMap [pos] == -1) {
			this.gemMap [pos] = color
			const gem = elem ({
				tag: 'path', svg: true, cls: 'gem',
				cssVar: { x, y, color }
			})
			this.element.appendChild (gem)
			return gem
		}
		else throw (new Error ('there is a gem at this position, already'))
	}
	fill ({color = 'random'}) {
		hyperIter (this.size, ([y, x]) => this.newGem ({y, x, color}))
		return this
	}
}