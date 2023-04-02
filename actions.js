let draggedFrom

export const actions = {
	dragAndSwap : {
		onmousedown (event) {
			draggedFrom = playfield.screen2pos (event)
		},
		onmouseup (event) {
			playfield.swap (draggedFrom, playfield.screen2pos (event))
		}
	}
}