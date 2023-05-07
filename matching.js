import { hyperIter } from "./tools"

const countRows = (field, {dx = 0, dy = 0}) => {
	const result = new Set ()
	hyperIter ([field.high, field.wide], ([y, x]) => {
		const current = field.getByClass ({x, y})
		const match = field.getByClass ({
			y: y + dy, x: x + dx, color: current.color
		})
		if (match)
			result.forEach (group => group.has (match) && group.add (current))
		else
			result.add (new Set ([current]))
	})
	return result
}

