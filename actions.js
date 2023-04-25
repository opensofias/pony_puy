let currentSchemeName
const currentScheme = () => actions [currentSchemeName]

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

export const registerActions = (field, newSchemeName) => {
	if (currentSchemeName) {
		for (const type in currentScheme ().fieldEvents)
			field.removeEventListener (type, currentScheme ().fieldEvents [type])
		for (const type in currentScheme ().bodyEvents)
			document.body.removeEventListener (type, currentScheme ().bodyEvents [type])
	}
	currentSchemeName = newSchemeName
	if (newSchemeName) {
		for (const type in currentScheme ().fieldEvents)
			field.addEventListener (type, currentScheme ().fieldEvents [type])
		for (const type in currentScheme ().bodyEvents)
			document.body.addEventListener (type, currentScheme ().bodyEvents [type])
	}
}