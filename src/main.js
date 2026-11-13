import { getCreatures, searchCreature } from "./services/api.js";
import { affichage, showDetails, hideDetails, showEmpty, showError, showLoading } from "./ui.js";

let allCreatures = [];
let offset = 20;
let isLoading = false;
let lastAction = null;


let currentType = "all";
const button = document.getElementById("chargeBtn");
const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search");
const searchBtn = document.getElementById("search-btn");
const clearBtn = document.getElementById("clear-btn");
const grid = document.getElementById("grid");
const detailClose = document.getElementById("detail-close");

async function loadCreatures() {
    lastAction = loadCreatures;
    showLoading();
    try{
        allCreatures = await getCreatures(0);
        applyFilter();
    } catch (error) {
        showError(error.message)
    }

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
    lastAction = () => {handleSearch(event)}
    showLoading()
    searchBtn.disabled = true
    try {
        const found = await searchCreature(query);
        affichage([found])
    } catch (error) {
        if (error.message.includes("404") === true) {
            showEmpty(query);
        } else {
            showError(error.message)
        }
    } finally {
        searchBtn.disabled = false
    }
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

grid.addEventListener("click", (event) => {
    if (event.target.id === "retry-btn" && lastAction !== null){
        lastAction()
    }
} )