import { hyperIter } from "./tools.js"
import { ElementWrapper } from "./element.js"
import { Gem, Slot } from "./gem.js"

export class Playfield extends ElementWrapper {
	constructor ({
		high = 12, wide = 6,
		colors = 4
	} = {}) {
		super ({
			tag: 'svg', type: 'svg', cls: 'playfield',
			attrs: {
				viewBox: "0 0 " + wide + ' ' + high
			},
			cssVars: { colors },
			content: hyperIter ([high, wide], ([y, x]) => (new Slot ({y, x})).element)
		})
		Object.assign (this, {
			gems: new Array (high * wide),
			high, wide, colors
		}
	)}
	pos2idx ({y, x}) { return y + this.high * x }
	idx2pos (idx) { return {
		y: idx % this.high,
		x: Math.floor (idx / this.high)
	}}
	getPosition (pos) {
		return this.element.children[this.pos2idx (pos)].wrapper
	}
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
		[...this.element.children].forEach (({wrapper}) =>
			wrapper instanceof Slot && wrapper.createGem (
				color == 'random' ?
					Math.floor(Math.random() * this.colors) :
					color
			))
		return this
	}
}