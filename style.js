import { hyperIter } from "./tools.js"

export const generateBlobStyles = () => {
	const sheet = new CSSStyleSheet()
	const directions = ['top', 'right', 'bottom', 'left']

	hyperIter ([2, 2, 2, 2], vec => {

		const selector = vec.reduce ((prev, cur, idx) =>
			prev + (cur ? '.blob-' + directions[idx] : '')
			, '.gem'
		)

		const rule = `d: path('M${vec[3] ? -17 : -7},0 L-5,5 L0,${vec[2] ? 17 : 7} L5,5 L${vec[1] ? 17 : 7},0 L5,-5 L0,${vec[0] ? -17 : -7} L-5,-5 Z')`

		sheet.insertRule(`${selector} { ${rule} }`, sheet.cssRules.length)
	})

	document.adoptedStyleSheets = [...document.adoptedStyleSheets, sheet]
	return sheet
}

export const generateGemClasses = ({wide, high, colors}) => {
	const sheet = new CSSStyleSheet()
	hyperIter ([wide] , ([x]) => {
		sheet.insertRule(`.x${x} { --x:${x} }`, sheet.cssRules.length)
	})
	hyperIter ([high] , ([y]) => {
		sheet.insertRule(`.y${y} { --y:${y} }`, sheet.cssRules.length)
	})
	hyperIter ([colors] , ([color]) => {
		sheet.insertRule(`.color${color} { --color:${color} }`, sheet.cssRules.length)
	})
	document.adoptedStyleSheets = [...document.adoptedStyleSheets, sheet]
	return sheet
}
