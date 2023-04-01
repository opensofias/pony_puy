import { hyperIter } from "./tools.js"
import { ElementWrapper } from "./element.js"
import { Gem, Slot } from "./gem.js"
import { generateGemClasses } from "./style.js"

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
			high, wide, colors
		})
		generateGemClasses ({wide, high, colors})
	}
	pos2idx ({y, x}) { return y + this.high * x }
	idx2pos (idx) { return {
		y: idx % this.high,
		x: Math.floor (idx / this.high)
	}}
	getByClass (classes, all) {
		const classQuery = Object.entries (classes).map (x => '.' + x.join('')).join('')
		if (!all)
			return this.querySelector (classQuery)?.wrapper
		else
			return [...this.querySelectorAll (classQuery)].map (x => x.wrapper)
	}
	swap (...positions) {
		positions
			.map (pos => this.getByClass (pos))
			.forEach ((thing, idx) => thing.position = positions[1 - idx])
	}
	fill ({color = 'random'} = {}) {
		for (const {wrapper} of this.children) {
			wrapper instanceof Slot && wrapper.createGem (
				color == 'random' ?
					Math.floor(Math.random() * this.colors) :
					color
			)
		}
		return this
	}
	blobAll () {
		for (const {wrapper} of this.children) wrapper.updateBlob()
	}
}