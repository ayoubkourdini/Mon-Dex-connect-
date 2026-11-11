import { getCreatures } from "./services/api.js";
import { affichage } from "./ui.js";

let allCreatures = [];
let offset = 20;
let currentType = "all";
const button = document.getElementById("chargeBtn");

async function loadCreatures() {
    allCreatures = await getCreatures(0);
    applyFilter();
}
loadCreatures()

function applyFilter() {
    if (currentType === "all") {
        affichage(allCreatures);
    } else {
        const filtered = allCreatures.filter(creature => creature.type === currentType);
        affichage(filtered);
    }
}

button.addEventListener("click", async () => {
    const newCreature = await getCreatures(offset);
    allCreatures = [...allCreatures, ...newCreature];
    offset += 20;
    applyFilter();
})

const filterButtons = document.querySelectorAll("#filters button");
filterButtons.forEach(filterBtn => {
    filterBtn.addEventListener("click", () =>  {
        currentType = filterBtn.dataset.type
        applyFilter() 
    })
})

