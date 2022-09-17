import {createSketch} from "./app";
import {registerDevEvents} from "./publicworks";

const devmode = true;

if(devmode) {
    registerDevEvents()
}

createSketch()