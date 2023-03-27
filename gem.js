import { ElementWrapper, adoptCssVars } from "./element.js";

const directions = ['top', 'right', 'bottom', 'left']

export class Slot extends ElementWrapper {
	constructor ({y, x}) {
		super ({
			tag: 'g', type: 'svg', cls: 'slot',
			cssVars: {x, y},
		})
	}
	createGem (color) {
		const newGem = new Gem ({color, x: this.x, y: this.y})
		this.element.replaceWith (newGem.element)
		return newGem
	}
}
adoptCssVars (Slot, 'x y')

export class Gem extends ElementWrapper {
	constructor ({y, x, color}) {
		super ({
			tag: 'path', type: 'svg', cls: 'gem',
			cssVars: {
				x, y,
				color: color == 'random' ?
					Math.floor(Math.random() * this.colors) :
					color
			},
		})
	}
	set blob (sides) {
		for (const side in sides)
			this.classes [sides [side] ? 'add' : 'remove'] ('blob-' + side)
	}
	get blob () {return directions.reduce ((result, direction) =>
			({...result, [direction]: this.classes.contains ('blob-' + direction)}),
		{}
	)}
	destroyGem () {
		const newSlot = new Slot ({x: this.x, y: this.y})
		this.element.replaceWith (newSlot.element)
		return newSlot
	}
}
adoptCssVars (Gem, 'x y color')