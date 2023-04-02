let draggedFrom

export const actions = {
	dragAndSwap : {
		onmousedown (event) {
			draggedFrom = this.wrapper.screen2pos (event)
		},
		onmouseup (event) {
			this.wrapper.swap (draggedFrom, this.wrapper.screen2pos (event))
		}
	}
}