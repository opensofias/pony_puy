import { generateBlobStyles, registerProps } from "./style.js"
import { Playfield } from "./playfield.js";
import { registerActions } from "./actions.js";
import { destroyRows } from "./matching.js";

const playfield = new Playfield ();
window.playfield = playfield
document.body.appendChild(playfield.element);
playfield.fill()
playfield.blobAll()
generateBlobStyles ()
registerProps ()

registerActions (playfield, 'dragAndSwap')

window.deregister = () => registerActions (playfield) // for testing if deregistering works
window.destroy3 = () => destroyRows (playfield)