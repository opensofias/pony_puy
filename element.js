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
		content = [], mixin = {},
	} = {}) {
		this.element = Object.assign (
			document.createElementNS (types[type], tag),
			{wrapper: this}, mixin
		)

		Object.assign (this, {attrs, styles, cssVars})

		cls && cls.split(' ').forEach (x => this.element.classList.add (x))
		id && (this.element.id = id)

		void (type =>
			['string', 'number'].includes (type) ?
			this.element.innerText = content :
			type == 'object' && [content].flat ()
				.forEach(contEl => this.element.appendChild(contEl))
		) (typeof content)
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
}

// create getters for properties of the element, the colon siginifies a shorthand
[
	'classes:classList', 'parent:parentElement',
	'next:nextElementSibling', 'prev:previousElementSibling'
].map (x => x.split (':')).forEach(prop =>
	Object.defineProperty(ElementWrapper.prototype, prop[0], {
		get () { return this.element[prop[1] ?? prop [0]] },
	})
)
