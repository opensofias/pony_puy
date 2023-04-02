let draggedFrom

export const actions = {
	dragAndSwap : {
		onmousedown (event) {
			draggedFrom = this.wrapper.screen2pos (event)
			this.wrapper.getByClass (draggedFrom).addClasses ('selected')
		},
		onmouseup (event) {
			this.wrapper.getByClass (draggedFrom).removeClasses ('selected')
			this.wrapper.swap (draggedFrom, this.wrapper.screen2pos (event))
		}
	}
}