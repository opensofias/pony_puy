export const elem = ({
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

export const hyperIter = (size = [], fun = x => x) => {
	if (!(size.length) || Math.min (...size) < 1) return []

	const count = (new Array(size.length)).fill(0)
	const result = []
	let carry = 0
	while (!carry) {
		result.push (fun (count))

		carry ++
		size.forEach ((target, idx) => {
			if (carry)
				if (count[idx] == target -1) count[idx] = 0
				else {count[idx] ++; carry -- }
		})
	}

	return result
}