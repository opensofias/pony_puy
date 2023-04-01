import { ElementWrapper, getVarSetClass } from "./element.js";

const directions = {
	up: {dy: -1, dx: 0}, right: {dy: 0, dx: 1}, down: {dy: 1, dx: 0}, left: {dy: 0, dx: -1}
}

class MaybeGem extends ElementWrapper {
	constructor (...params) {super (...params)}
	get position () {return {x: this.x, y: this.y}}
	set position ({x, y}) {Object.assign (this, {x, y})}
	getNeighbor ({dx, dy}) {
		this.field.getByClass ({x: this.x + dx, y: this.y + dy})
	}
	get field () {
		return this.parent.wrapper
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
		this.replaceWith (newGem.element)
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
		this.replaceWith (newSlot.element)
		return newSlot
	}
	updateBlob () {
		this.blob = Object.entries(directions).reduce ((blob, [label, vec]) => 
			({...blob, [label]: this.field.getByClass ({
				x: this.x + vec.dx,
				y: this.y + vec.dy,
				color: this.color
			}) && true})
		, {})
	}
}
getVarSetClass (Gem, 'color')