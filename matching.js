import { hyperIter } from "./tools.js"

const countRows = (field, {dx = 0, dy = 0} = {dx: 1, dy: 0}) => {
	const result = []
	hyperIter ([field.high, field.wide], ([y, x]) => {
		const current = field.getByClass ({x, y})
		let currentGroup =
			result.findLast (group => group.includes (current))
		!currentGroup && result.push (currentGroup = [current])

		const match = field.getByClass ({
			y: y + dy, x: x + dx, color: current.color
		})
		match && currentGroup.push (match)
	})
	return result
}

export const destroyRows = (field, {dx = 1, dy = 0, length = 3} = {}) => {
	countRows (field, {dx, dy}).forEach (row => (row.length >= length) && row.forEach (gem => gem.destroyGem()))
}