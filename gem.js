import { elem } from "./tools.js";

const directions = ['top', 'right', 'bottom', 'left']

export class Gem {
	constructor ({y, x, color}) {
		this.element = elem ({
			tag: 'path', svg: true, cls: 'gem',
			cssVar: {
				x, y,
				color: color == 'random' ?
					Math.floor(Math.random() * this.colors) :
					color
			},
			mixin: {ob: this}
		})
	}
	getCssVar (prop) {
		return this.element.style.getPropertyValue ('--' + prop)
	}
	setCssVar (prop, val) {
		this.element.style.setProperty ('--' + prop, val)
	}
}

['x', 'y', 'color'].forEach(prop =>
	Object.defineProperty(Gem.prototype, prop, {
		get () {return Number.parseInt(this.getCssVar(prop))},
		set (val) { this.setCssVar(prop, val) }
	})
)