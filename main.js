import { generateBlobStyles } from "./style.js"
import { Playfield } from "./playfield.js";

const playfield = new Playfield ().fill ();
document.body.appendChild(playfield.element);
generateBlobStyles ()