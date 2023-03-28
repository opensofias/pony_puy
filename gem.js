import { ElementWrapper, getVarSetClass } from "./element.js";

const directions = {
	top: {dy: -1, dx: 0}, right: {dy: 1, dx: 0}, bottom: {dy: 1, dx: 0}, left: {dy: -1, dx: 0}
}

class MaybeGem extends ElementWrapper {
	constructor (...params) {super (...params)}
	get position () {return {x: this.x, y: this.y}}
	set position ({x, y}) {Object.assign (this, {x, y})}
	getNeighbor ({dx, dy}) {
		this.field.getByClass ({x: this.x + dx, y: this.y + dy})
	}
	get field () {
		return this.element.parentElement.wrapper
	}
}
getVarSetClass (MaybeGem, 'x y')

export class Slot extends MaybeGem {
	constructor ({y, x}) {
		super ({
			tag: 'g', type: 'svg', cls: `slot x${x} y${y}`,
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
			tag: 'path', type: 'svg', cls: `gem x${x} y${y} color${color}`,
		})
	}
	set blob (sides) {
		for (const side in sides)
			this.classes [sides [side] ? 'add' : 'remove'] ('blob-' + side)
	}
	get blob () {return Object.keys (directions).reduce ((result, direction) =>
			({...result, [direction]: this.classes.contains ('blob-' + direction)}),
		{}
	)}
	destroyGem () {
		const newSlot = new Slot (this.position)
		this.element.replaceWith (newSlot.element)
		return newSlot
	}
}
getVarSetClass (Gem, 'color')