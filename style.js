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
}