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

const applyListeners = (target, listeners, add = false) =>
	Object.entries (listeners).forEach (([type, listener]) =>
		target [(add ? 'add' : 'remove') + 'EventListener'] (type, listener)
	)

export const registerActions = (field, newSchemeName) => {
	if (currentSchemeName) {
		applyListeners (field, currentScheme ().fieldEvents, false)
		applyListeners (document.body, currentScheme ().bodyEvents, false)
	}
	currentSchemeName = newSchemeName
	if (newSchemeName) {
		applyListeners (field, currentScheme ().fieldEvents, true)
		applyListeners (document.body, currentScheme ().bodyEvents, true)
	}
}