import { getCreatures } from "./services/api.js";
import { affichage } from "./ui.js";

let allCreatures = [];
let offset = 20;
const button = document.getElementById("chargeBtn");

async function loadCreatures() {
    allCreatures = await getCreatures(0);
    affichage(allCreatures)
}
loadCreatures()

button.addEventListener("click", async () => {
    const newCreature = await getCreatures(offset);
    allCreatures = [...allCreatures, ...newCreature];
    offset += 20;
    affichage(allCreatures);
})
