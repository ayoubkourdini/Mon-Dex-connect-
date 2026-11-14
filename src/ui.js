const grid = document.getElementById("grid");
const panel = document.getElementById("panneau");



export function affichage(liste) {
  grid.innerHTML = "";

  for (let i = 0; i < liste.length; i++) {
    const c = liste[i];
    const card = `
  <article data-id="${c.id}" class="flex flex-col cursor-pointer gap-3 rounded-card bg-white p-3 pb-4">
    <img src="${c.image}" alt="${c.name}" class="h-28 w-28 mx-auto">
    <h3 class="font-display text-xl font-semibold">${c.name}</h3>
    <p class="text-sm text-muted">Type: ${c.type}</p>
  </article>
`;
    grid.innerHTML += card;
  }
}

export function showDetails(c) {


  document.getElementById("detail-id").textContent = c.id + " · Détail";
  document.getElementById("detail-name").textContent = c.name;
  document.getElementById("detail-type").textContent = c.type;
  document.getElementById("detail-image").src = c.image;
  document.getElementById("detail-image").alt = c.name;
  document.getElementById("detail-description").textContent ="Taille: " + c.height/10 + "m, " + "Poids: " + c.weight/10 + "kg";

  const noms = ["hp", "attack", "defense"];
  for (let i = 0; i < noms.length; i++) {
    const nom = noms[i];
    const stat = c.stats.find((creature) => creature.name === nom  );
    const valeur = stat.value
    const pourcentage = Math.min((valeur / 255) * 100, 100);
    document.getElementById("detail-" + nom + "-value").textContent = valeur;
    document.getElementById("detail-" + nom + "-bar").style.width = pourcentage + "%";
  }

  panel.classList.remove("hidden");
  panel.classList.add("flex");
}

export function hideDetails() {
  panel.classList.add("hidden");
  panel.classList.remove("flex");
}

export function showLoading() {
  grid.innerHTML = "Chargement..."
}

export function showEmpty(query) {
  grid.innerHTML = `Aucune créature trouvée pour ${query}.`
}

export function showError(message) {
  grid.innerHTML = `<p class="col-span-full">${message}</p>
  <button id="retry-btn">Réessayer</button>`
} 

export function showDetailLoading (){
  panel.classList.remove("hidden");
  panel.classList.add("flex");
  document.getElementById("detail-description").textContent = "Chargement..."
}

export function showDetailError(message){
  document.getElementById("detail-description").textContent = message
  panel.classList.remove("hidden");
  panel.classList.add("flex");
}