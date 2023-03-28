import { generateBlobStyles } from "./style.js"
import { Playfield } from "./playfield.js";

const playfield = new Playfield ();
window.playfield = playfield
document.body.appendChild(playfield.element);
playfield.fill()
generateBlobStyles ()