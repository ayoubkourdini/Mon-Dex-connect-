import { getCreatures } from "./services/api.js";
import { affichage } from "./ui.js";

let allCreatures = [];

async function loadCreatures() {
    allCreatures = await getCreatures(0);
    affichage(allCreatures)
}
loadCreatures()

