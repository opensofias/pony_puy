const elem = ({
	tag = 'div', svg = false,
	attr = {}, style = {}, cssVar = {},
	cls = '', id= '',
	content = [], mixin = {},
}) => {
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

	return Object.assign (result, mixin)
}

export class ElementWrapper {
	constructor(...param) {
		this.element = elem(...param);
		this.element.wrapper = this;
	}
	getCssVar(prop) {
		return this.style.getPropertyValue('--' + prop);
	}
	setCssVar(prop, val) {
		this.style.setProperty('--' + prop, val);
	}
	get classes() { return this.element.classList }
	get style() { return this.element.style }
}
