// =============================================================
// script.js — Mon Dex
// =============================================================
// Les données viennent de data.js (la constante `creatures`).
// Écrivez votre code ici, fonctionnalité par fonctionnalité.
// Une carte GitHub Projects et au moins un commit par fonctionnalité.


// -------------------------------------------------------------
// 1. AFFICHAGE
// Supprimez les cartes écrites à la main dans index.html et
// construisez la grille à partir du tableau `creatures`.
// -------------------------------------------------------------


// -------------------------------------------------------------
// 2. DÉTAIL
// Un clic sur une carte ouvre le panneau de détail :
// image, description, et statistiques affichées en barres.
// -------------------------------------------------------------


// -------------------------------------------------------------
// 3. RECHERCHE
// La liste se met à jour pendant la saisie d'un nom
// (sans tenir compte des majuscules).
// -------------------------------------------------------------


// -------------------------------------------------------------
// 4. FILTRE
// Les boutons de type n'affichent que les créatures de ce type ;
// « Tous » réinitialise le filtre.
// La recherche et le filtre fonctionnent ENSEMBLE.
// -------------------------------------------------------------


// -------------------------------------------------------------
// 5. CRÉER UNE CRÉATURE
// Validez chaque champ du formulaire avec une expression régulière
// (voir le tableau du brief). Affichez le message d'erreur sous le
// champ, et n'ajoutez jamais une créature invalide.
// -------------------------------------------------------------


// -------------------------------------------------------------
// 6. MON ÉQUIPE
// Boutons « Ajouter à l'équipe » et « Retirer », gérés avec UN SEUL
// écouteur sur la grille et UN SEUL sur l'équipe (délégation).
// -------------------------------------------------------------


// -------------------------------------------------------------
// 7. RÈGLES DE L'ÉQUIPE
// 6 créatures au maximum, pas de doublon, un message clair quand
// une action est refusée, et un compteur (x/6).
// -------------------------------------------------------------


// -------------------------------------------------------------
// BONUS : LocalStorage, Fetch API, tri, comparaison
// -------------------------------------------------------------
const grid = document.getElementById("grid");
const panneau = document.getElementById("panneau");
const search = document.getElementById("search");
const form = document.getElementById("creature-form");
const teamSlots = document.getElementById("team-slots")
const teamCount = document.getElementById("team-count")
const teamCountNav = document.getElementById("team-count-nav");
let creatureOuverte;

let texteActuel = "";
let typeActuel = "Tous";
let equipe = [];

function affichage(liste) {
  grid.innerHTML = "";

  for (let i = 0; i < liste.length; i++) {
    const c = liste[i];
    const card = `
  <article data-id="${c.id}" class="flex flex-col cursor-pointer gap-3 rounded-card bg-white p-3 pb-4">
    <img src="${c.image}" alt="${c.name}" class="h-28 w-28 mx-auto">
    <h3 class="font-display text-xl font-semibold">${c.name}</h3>
    <p class="text-sm text-muted">Type: ${c.type}</p>
    <p class="text-sm text-muted">HP: ${c.stats.hp}</p>
    <button type="button" data-id="${c.id}" data-action="add" class="btn-outline">Ajouter à l'équipe</button>
  </article>
`;
    grid.innerHTML += card;
  }
  monEquipe();
  document.getElementById("creature-count").textContent = creatures.length;
}
affichage(creatures)

function detail(c) {
 creatureOuverte = c;

  document.getElementById("detail-id").textContent = c.id + " · Détail";
  document.getElementById("detail-name").textContent = c.name;
  document.getElementById("detail-type").textContent = c.type.join(", ");
  document.getElementById("detail-level").textContent = c.level;
  document.getElementById("detail-description").textContent = c.description;
  document.getElementById("detail-image").src = c.image;
  document.getElementById("detail-image").alt = c.name;

  const noms = ["hp", "attack", "defence"];
  for (let i = 0; i < noms.length; i++) {
    const nom = noms[i];
    const valeur = c.stats[nom];
    const pourcentage = Math.min((valeur / 255) * 100, 100);
    document.getElementById("detail-" + nom + "-value").textContent = valeur;
    document.getElementById("detail-" + nom + "-bar").style.width = pourcentage + "%";
  }

  panneau.classList.remove("hidden");
  panneau.classList.add("flex");
}

grid.addEventListener("click", function (event) {
  if (event.target.closest("[data-action='add']")) return;

  const carte = event.target.closest("article");
  if (!carte) return;

  const c = creatures.find(function (item) {
    return String(item.id) === carte.dataset.id;
  });

  detail(c);
});
document.getElementById("detail-close").addEventListener("click", function () {
  panneau.classList.add("hidden");
  panneau.classList.remove("flex");
});
document.getElementById("detail-add").addEventListener("click", function () {
  regleEquipe(creatureOuverte);
});

function recherche(event) {
  texteActuel = event.target.value.trim().toLowerCase();
  filter()
}

search.addEventListener("input", recherche);

function filter() {
  const resultats = [];

  for (let i = 0; i < creatures.length; i++) {
    const c = creatures[i];
    const nom = c.name.toLowerCase();

    if (nom.includes(texteActuel)) {
      if (typeActuel === "Tous") {
        resultats.push(c);
      } else if (c.type.includes(typeActuel)) {
        resultats.push(c);
      }
    }
  }

  affichage(resultats);
}

const boutons = document.querySelectorAll("#filters button");

for (let i = 0; i < boutons.length; i++) {
  boutons[i].addEventListener("click", function () {
    typeActuel = boutons[i].textContent;
    filter();
  });
}

function creeCreature() { 
  const regexNumero = /^#\d{3}$/;
  const regexNom = /^[A-Za-zÀ-ÿ0-9][A-Za-zÀ-ÿ0-9 .'-]{1,29}$/;
  const regexStat = /^\d{1,3}$/;
  const regexImage = /^https:\/\/\S+\.(png|jpe?g|webp|gif)$/i;
  const regexDescription = /^[\s\S]{10,200}$/;
  form.addEventListener("submit", function(event){
    event.preventDefault()
    const numero = "#" + form.elements["id"].value.trim();
    const nom = form.elements["name"].value.trim();
    const type = form.elements["type"].value;
    const niveau = form.elements["level"].value.trim();
    const stat1 = form.elements["stat1"].value.trim();
    const stat2 = form.elements["stat2"].value.trim();
    const stat3 = form.elements["stat3"].value.trim();
    const image = form.elements["image"].value.trim();
    const desc = form.elements["description"].value.trim();
    let valide = true;
  document.getElementById("erreur-numero").textContent = "";

  if (regexNumero.test(numero) == false) {
    document.getElementById("erreur-numero").textContent = "Format : 010"; 
    valide = false;
  }

  for (let i = 0; i < creatures.length; i++) {
    if (numero === creatures[i].id) {
      document.getElementById("erreur-numero").textContent = "id déjà utilisé"
     valide = false;

    
    }
  }

  document.getElementById("erreur-nom").textContent = "";
   if (regexNom.test(nom) == false) {
    document.getElementById("erreur-nom").textContent = "2 à 30 caractères. Commence par une lettre ou un chiffre";
    valide = false;

   }

   document.getElementById("erreur-type").textContent = "";
   if (type == "") {
    document.getElementById("erreur-type").textContent = "Choisis un type";
    valide = false;

   }

   document.getElementById("erreur-niveau").textContent = "";
   if (niveau == "") {
    document.getElementById("erreur-niveau").textContent = "Choisis un niveau";
    valide = false;

   }

   document.getElementById("erreur-stat1").textContent = "";
   if (regexStat.test(stat1) == false) {
    document.getElementById("erreur-stat1").textContent = "Nombre entier de 0 à 999 (ex. 45)"
    valide = false;

   }

   document.getElementById("erreur-stat2").textContent = "";
   if (regexStat.test(stat2) == false) {
    document.getElementById("erreur-stat2").textContent = "Nombre entier de 0 à 999 (ex. 45)"
    valide = false;

   } 
   document.getElementById("erreur-stat3").textContent = "";
   if (regexStat.test(stat3) == false) {
    document.getElementById("erreur-stat3").textContent = "Nombre entier de 0 à 999 (ex. 45)"
    valide = false;

   }

   document.getElementById("erreur-image").textContent = "";
   if (regexImage.test(image) == false) {
    document.getElementById("erreur-image").textContent = "Lien https finissant par .png, .jpg, .jpeg, .webp ou .gif"
    valide = false;

   }

   document.getElementById("erreur-description").textContent = "";
   if (regexDescription.test(desc) == false) {
    document.getElementById("erreur-description").textContent = "Entre 10 et 200 caractères"
    valide = false;

   }

    if (valide === true) {
      const nouvelleCreature = {
        id: numero,
        name: nom,
        type: [type],
        level: niveau,
        stats: { hp: Number(stat1), attack: Number(stat2), defence: Number(stat3) },
        image: image,
        description: desc
      };

      creatures.push(nouvelleCreature);
      filter();
      form.reset();
    }
  });

  form.elements["id"].addEventListener("input", function () {
    const valeur = form.elements["id"].value;
    const erreur = document.getElementById("erreur-numero");

    if (/^\d*$/.test(valeur) === false) {
      erreur.textContent = "Chiffres uniquement (ex. 010)";
    } else if (valeur.length < 3) {
      erreur.textContent = "Écris 3 chiffres (ex. 010)";
    } else {
      erreur.textContent = "";
    }
  });

 
};
creeCreature();


function monEquipe() {
  let html = "";

  for (let i = 0; i < 6; i++) {
    if (equipe[i] != undefined) {
      html += `
      <div class="flex flex-col items-center gap-1 rounded-xl border-2 border-black bg-white p-2 text-center">
        <img src="${equipe[i].image}" alt="${equipe[i].name}" class="h-16 w-16 object-contain">
        <p class="text-sm font-bold">${equipe[i].name}</p>
        <p class="text-xs text-muted">${equipe[i].type.join(" / ")}</p>
        <button type="button" data-action="remove" data-id="${equipe[i].id}"
          class="mt-1 w-full rounded-full border-2 border-red-600 px-2 py-1 text-xs font-bold text-red-600 hover:bg-red-600 hover:text-white">
          Retirer
        </button>
      </div>
      `;
    } else {
      html += `
      <div class="flex min-h-36 items-center justify-center rounded-xl border-2 border-dashed border-gray-300 p-2 text-xs text-gray-400">
        Emplacement libre
      </div>
      `;
    }
  }

  teamSlots.innerHTML = html;
  teamCount.textContent = equipe.length + "/6";
  teamCountNav.textContent = equipe.length;

  const boutonsAjout = document.querySelectorAll("[data-action='add'], #detail-add");

  for (let i = 0; i < boutonsAjout.length; i++) {
    if (equipe.length == 6) {
      boutonsAjout[i].style.display = "none";
    } else {
      boutonsAjout[i].style.display = "";
    }
  }
}
monEquipe();

grid.addEventListener("click", function (event) {
  if (event.target.dataset.action == "add") {
    let id = event.target.dataset.id;
    let creature;

    for (let i = 0; i < creatures.length; i++) {
      if (creatures[i].id == id) {
        creature = creatures[i];
      }
    }

    regleEquipe(creature);
  }
});

teamSlots.addEventListener("click", function (event) {
  if (event.target.dataset.action == "remove") {
    let id = event.target.dataset.id;

    for (let i = 0; i < equipe.length; i++) {
      if (equipe[i].id == id) {
        equipe.splice(i, 1);
      }
    }
    

    monEquipe();
  }
});

function regleEquipe(creature) {
  if (equipe.length == 6) {
    alert("L'équipe est complète (6 maximum)");
  } else if (equipe.includes(creature)) {
    alert("Cette créature est déjà dans l'équipe");
  } else {
    equipe.push(creature);
    monEquipe();
  }
}


const filters = document.getElementById("filters");
const buttons = filters.querySelectorAll(".chip");

buttons.forEach(function (button) {
  button.addEventListener("click", function () {
    buttons.forEach(function (btn) {
      btn.classList.remove("active");
    });

    button.classList.add("active");
  });
});
