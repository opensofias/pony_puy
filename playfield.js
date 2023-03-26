import { hyperIter } from "./tools.js"
import { ElementWrapper } from "./element.js"
import { Gem } from "./gem.js"

export class Playfield extends ElementWrapper {
	constructor ({
		size = [12, 6],
		colors = 4
	} = {}) {
		super ({
			tag: 'svg', type: 'svg', cls: 'playfield',
			attrs: {
				viewBox: "0 0 " + size[1] + ' ' + size[0]
			},
			cssVars: { colors },
		})
		Object.assign (this, {
			gems: new Array (size[0] * size [1]),
			size, colors
		}
	)}
	pos2idx ({y, x}) { return y + this.size [0] * x }
	idx2pos (idx) { return {
		y: idx % this.size [0],
		x: Math.floor (idx / this.size [0])
	}}
	newGem ({y, x, color}) {
		color == 'random' && (color = Math.floor(Math.random() * this.colors))
		const pos = this.pos2idx ({y, x})
		if (!this.gems [pos]) {
			const gem = new Gem ({ x, y, color })
			this.gems [pos] = gem
			this.element.appendChild (gem.element)
			return gem
		}
		else throw (new Error ('there is a gem at this position, already'))
	}
	fill ({color = 'random'} = {}) {
		hyperIter (this.size, ([y, x]) => this.newGem ({y, x, color}))
		return this
	}
}