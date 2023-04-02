import { generateBlobStyles } from "./style.js"
import { Playfield } from "./playfield.js";
import { actions } from "./actions.js";

const playfield = new Playfield ();
window.playfield = playfield
document.body.appendChild(playfield.element);
playfield.fill()
playfield.blobAll()
generateBlobStyles ()

// temporary colution for building drag&drop
Object.assign (playfield.element, actions.dragAndSwap)