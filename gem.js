import { ElementWrapper } from "./element.js";

const directions = ['top', 'right', 'bottom', 'left']

export class Gem extends ElementWrapper {
	constructor ({y, x, color}) {
		super ({
			tag: 'path', svg: true, cls: 'gem',
			cssVar: {
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
}

['x', 'y', 'color'].forEach(prop =>
	Object.defineProperty(Gem.prototype, prop, {
		get () {return Number.parseInt(this.getCssVar(prop))},
		set (val) { this.setCssVar(prop, val) }
	})
)