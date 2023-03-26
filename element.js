const types = {
	html: 'http://www.w3.org/1999/xhtml',
	svg: 'http://www.w3.org/2000/svg',
	mathMl: 'http://www.w3.org/1998/Math/MathML'
}

export class ElementWrapper {
	constructor({
		tag = 'div', type = 'html',
		attr = {}, style = {}, cssVar = {},
		cls = '', id= '',
		content = [], mixin = {},
	} = {}) {
		const result = document.createElementNS (types[type], tag)

		for (const name in attr) result.setAttribute(name, attr[name])
		for (const name in style) result.style.setProperty(name, style[name])
		for (const name in cssVar) result.style.setProperty('--' + name, cssVar[name])
		cls && cls.split(' ').forEach (x => result.classList.add (x))
		id && (result.id = id)

		void (type =>
			['string', 'number'].includes (type) ?
				result.innerText = content :
			type == 'object' && [content].flat ()
				.forEach(contEl => result.appendChild(contEl))
		) (typeof content)

		this.element = Object.assign (result, mixin, {wrapper: this})
	}
	get attributes() {
		return [...this.element.attributes].reduce((result, {name, value}) =>
			({[name] : value, ...result})
		, {});
	}
	set attributes(attrs) {
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
