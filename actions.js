let currentActionScheme

const actions = {
	dragAndSwap : {
		fieldEvents: {
			pointerdown (event) {
				const draggedFrom = this.wrapper.getViaScreen (event)
				draggedFrom.addClasses ('selected')
				actions.dragAndSwap.dragged.set (event.pointerId, draggedFrom)
			},
			pointerup (event) {
				const draggedFrom = actions.dragAndSwap.dragged.get (event.pointerId)
				actions.dragAndSwap.dragged.delete (event.pointerId)
				draggedFrom.removeClasses ('selected')
				draggedFrom.swapWith (this.wrapper.getViaScreen (event))
			}
		},
		bodyEvents: {
			pointerleave (event) {
				const draggedFrom = actions.dragAndSwap.dragged.get (event.pointerId)
				actions.dragAndSwap.dragged.delete (event.pointerId)
				draggedFrom?.removeClasses ('selected')
			}
		},
		dragged: new Map (),
	}
}

export const registerActions = (field, actionsName) => {
	if (currentActionScheme) {
		for (const type in actions [currentActionScheme].fieldEvents)
			field.removeEventListener (type, actions [currentActionScheme].fieldEvents [type])
		for (const type in actions [currentActionScheme].bodyEvents)
			document.body.removeEventListener (type, actions [currentActionScheme].bodyEvents [type])
	}
	for (const type in actions [actionsName].fieldEvents)
		field.addEventListener (type, actions [actionsName].fieldEvents [type])
	for (const type in actions [actionsName].bodyEvents)
		document.body.addEventListener (type, actions [actionsName].bodyEvents [type])
	currentActionScheme = actionsName
}