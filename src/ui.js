const grid = document.getElementById("grid");


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