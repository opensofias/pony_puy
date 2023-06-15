import { hyperIter } from "./tools.js"

const countRows = (field, {dx = 0, dy = 0} = {dx: 1, dy: 0}) => {
	const result = new Set ()
	hyperIter ([field.high, field.wide], ([y, x]) => {
		const current = field.getByClass ({x, y})
		let currentGroup
		result.forEach (group => {group.has (current) && (currentGroup = group)})
		if (!currentGroup) {
			currentGroup = new Set ([current])
			result.add (currentGroup)
		}

		const match = field.getByClass ({
			y: y + dy, x: x + dx, color: current.color
		})
		if (match)
			currentGroup.add (match)
	})
	return result
}

export const destroyRows = (field, {dx = 1, dy = 0, length = 3} = {}) => {
	countRows (field, {dx, dy}).forEach (row => (row.size >= length) && row.forEach (gem => gem.destroyGem()))
}