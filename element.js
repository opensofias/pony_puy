export class ElementWrapper {
	constructor({
		tag = 'div', svg = false,
		attr = {}, style = {}, cssVar = {},
		cls = '', id= '',
		content = [], mixin = {},
	} = {}) {
		const result = svg ?
			document.createElementNS ('http://www.w3.org/2000/svg', tag) :
			document.createElement (tag)

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
	getCssVar(prop) {
		return this.style.getPropertyValue('--' + prop);
	}
	setCssVar(prop, val) {
		this.style.setProperty('--' + prop, val);
	}
	get attributes() {
		return Array.from(this.element.attributes).reduce((result, attr) => {
			result[attr.name] = attr.value;
			return result;
		}, {});
	}
	set attributes(attrs) {
		for (const name in attrs) {
			this.element.setAttribute(name, attrs[name]);
		}
	}
}

// create getters for properties of the element, the colon siginifies a shorthand
[
	'style',
	'classes:classList', 'parent:parentElement',
	'next:nextElementSibling', 'prev:previousElementSibling'
].map (x => x.split (':')).forEach(prop =>
	Object.defineProperty(ElementWrapper.prototype, prop[0], {
		get () { return this.element[prop[1] ?? prop [0]] },
	})
)