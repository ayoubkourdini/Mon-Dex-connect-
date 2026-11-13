import { getCreatures, searchCreature } from "./services/api.js";
import { affichage, showDetails, hideDetails } from "./ui.js";

let allCreatures = [];
let offset = 20;
let isLoading = false;


let currentType = "all";
const button = document.getElementById("chargeBtn");
const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search");
const searchBtn = document.getElementById("search-btn");
const clearBtn = document.getElementById("clear-btn");
const grid = document.getElementById("grid");
const detailClose = document.getElementById("detail-close");

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

async function handleSearch (event){
    event.preventDefault();
    const query = searchInput.value.toLowerCase().trim()
    if (query === "") {
        return
    }
    const found = await searchCreature(query);
    affichage([found])
}

function handleClear (){
    searchInput.value = "";
    applyFilter()
}

searchForm.addEventListener("submit", handleSearch);
clearBtn.addEventListener("click", handleClear)

async function handleCardClick (event) {
    const card = event.target.closest("article") 
    if (isLoading === false && card !== null) {
        isLoading = true
        try {
            const creature = await searchCreature(card.dataset.id)
            showDetails(creature)
        } catch (error) {
            console.error(error)
        } finally {
            isLoading = false
        }
    }
}
grid.addEventListener("click", handleCardClick)
detailClose.addEventListener("click", hideDetails)