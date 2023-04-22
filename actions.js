let draggedFrom
let currentActionScheme

export const actions = {
	dragAndSwap : {
		mousedown (event) {
			draggedFrom = this.wrapper.screen2pos (event)
			this.wrapper.getByClass (draggedFrom).addClasses ('selected')
		},
		mouseup (event) {
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