const dragMap = new Map ()
let currentActionScheme

const actions = {
	dragAndSwap : {
		pointerdown (event) {
			const draggedFrom = this.wrapper.screen2pos (event)
			this.wrapper.getByClass (draggedFrom).addClasses ('selected')
			dragMap.set (event.pointerId, draggedFrom)
		},
		pointerup (event) {
			const draggedFrom = dragMap.get (event.pointerId)
			dragMap.delete (event.pointerId)
			this.wrapper.getByClass (draggedFrom).removeClasses ('selected')
			this.wrapper.swap (draggedFrom, this.wrapper.screen2pos (event))
		}
	}
}

export const registerActions = (field, actionsName) => {
	if (currentActionScheme)
		for (const type in actions [currentActionScheme])
		field.removeEventListener (type, actions [currentActionScheme] [type])
	for (const type in actions [actionsName])
		field.addEventListener (type, actions [actionsName] [type])
	currentActionScheme = actionsName
}