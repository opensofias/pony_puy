const types = {
	html: 'http://www.w3.org/1999/xhtml',
	svg: 'http://www.w3.org/2000/svg',
	mathMl: 'http://www.w3.org/1998/Math/MathML'
}

export class ElementWrapper {
	constructor({
		tag = 'div', type = 'html',
		attrs = {}, styles = {}, cssVars = {},
		cls = '', id= '',
		content, mixin = {},
	} = {}) {
		this.element = Object.assign (
			document.createElementNS (types[type], tag),
			{wrapper: this}, mixin
		)

		Object.assign (this, {attrs, styles, cssVars})

		cls && (this.addClasses (cls))
		id && (this.id = id)

		content && this.append (...[content].flat())
	}
	get attrs() {
		return [...this.element.attributes].reduce((result, {name, value}) =>
			({[name] : value, ...result})
		, {});
	}
	set attrs(attrs) {
		for (const name in attrs)
			this.element.setAttribute(name, attrs[name]);
	}
	get styles () {
		return [...this.element.style].reduce ((result, prop) =>
			({[prop] : this.element.style.getPropertyValue (prop), ...result}),
		{})
	}
	set styles (styles) {
		for (const name in styles)
			this.element.style.setProperty(name, styles[name])
	}
	get cssVars () {
		return [...this.element.style].reduce ((result, prop) =>
			prop.startsWith ('--') ?
				({[prop.slice (2)] : this.element.style.getPropertyValue (prop), ...result}):
				result,
		{})
	}
	set cssVars (styles) {
		for (const name in styles)
			this.element.style.setProperty('--' + name, styles[name])
	}
	addClasses (classList) {
		classList.split(' ').forEach (x => this.classes.add (x))
	}
	removeClasses (classList) {
		classList.split(' ').forEach (x => this.classes.remove (x))
	}
}

// create getters for properties of the element, the colon siginifies a shorthand
[
	'classes:classList', 'parent:parentElement',
	'next:nextElementSibling', 'prev:previousElementSibling',
	'appendChild', 'removeChild', 'replaceChild', 'contains',
	'children', 'firstChild', 'lastChild',
	'prepend', 'append', 'after', 'before',
	'isEqualNode', 'isSameNode',
].map (x => x.split (':')).forEach(prop =>
	Object.defineProperty(ElementWrapper.prototype, prop[0], {
		get () { return this.element[prop[1] ?? prop [0]] },
	})
);
// getters and setters for mutable element properties
[
	'id', 'innerText'
].map (x => x.split (':')).forEach(prop =>
	Object.defineProperty(ElementWrapper.prototype, prop[0], {
		get () { return this.element[prop[1] ?? prop [0]] },
		set (val) { this.element[prop[1] ?? prop [0]] = val }
	})
);
