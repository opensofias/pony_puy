import { ElementWrapper, adoptCssVars } from "./element.js";

const directions = ['top', 'right', 'bottom', 'left']

class MaybeGem extends ElementWrapper {
	constructor (...params) {super (...params)}
	get position () {return {x: this.x, y: this.y}}
	set position ({x, y}) {Object.assign (this, {x, y})}
}
adoptCssVars (MaybeGem, 'x y')

export class Slot extends MaybeGem {
	constructor ({y, x}) {
		super ({
			tag: 'g', type: 'svg', cls: 'slot',
			cssVars: {x, y},
		})
	}
	createGem (color) {
		const newGem = new Gem ({color, ...this.position})
		this.element.replaceWith (newGem.element)
		return newGem
	}
}


export class Gem extends MaybeGem {
	constructor ({y, x, color}) {
		super ({
			tag: 'path', type: 'svg', cls: 'gem',
			cssVars: {x, y, color},
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
		const newSlot = new Slot (this.position)
		this.element.replaceWith (newSlot.element)
		return newSlot
	}
}
adoptCssVars (Gem, 'color')