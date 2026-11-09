# [Nom du Dex] — Encyclopédie interactive

> Un Dex rapide et responsive, pensé pour le téléphone, construit avec **Tailwind CSS** et **JavaScript** natif.

🔗 **Dex en ligne :** [https://TON-PSEUDO.github.io/NOM-DU-DEPOT/](https://TON-PSEUDO.github.io/NOM-DU-DEPOT/)

## Univers choisi

**[Pokémon / Digimon / Yu-Gi-Oh!]** — *(supprime les deux autres)*

| Champ | Signification dans mon univers |
| --- | --- |
| `type` | [ex. Type : Feu, Eau, Plante…] |
| `level` | [ex. Stade d'évolution] |
| `stats` | [ex. PV, Attaque, Défense] |

## Fonctionnalités

### Obligatoires
- [x] Affichage de la grille générée depuis le tableau `creatures`
- [x] Panneau de détail (image, description, statistiques en barres)
- [x] Recherche par nom en temps réel (insensible à la casse)
- [x] Filtre par type, combinable avec la recherche
- [x] Création d'une créature via un formulaire validé par expressions régulières
- [x] Section « Mon équipe » avec délégation d'événements (ajout / retrait)
- [x] Règles de l'équipe : 6 maximum, pas de doublon, messages clairs, compteur x/6

### Bonus
- [ ] LocalStorage (équipe et créatures créées conservées après rechargement)
- [ ] Fetch API (chargement depuis [PokeAPI / API Digimon / YGOPRODeck], message de chargement et d'erreur)
- [ ] Tri de la grille selon une statistique (croissant / décroissant)
- [ ] Comparaison de deux créatures côte à côte

*(coche uniquement ce que tu as réellement terminé)*

## Technologies

- HTML5
- Tailwind CSS (thème personnalisé dans `tailwind.config.js`)
- JavaScript (ES6+), sans framework
- GitHub Pages pour l'hébergement

## Structure du projet

```
├── index.html
├── data.js              # tableau d'au moins 12 créatures
├── script.js            # logique du Dex
├── tailwind.config.js   # couleurs et polices de l'univers
├── src/ ou css/         # styles
└── README.md
```

## Lancer le projet en local

```bash
git clone https://github.com/TON-PSEUDO/NOM-DU-DEPOT.git
cd NOM-DU-DEPOT
# Ouvrir index.html dans le navigateur (ou utiliser l'extension Live Server de VS Code)
```

## Sources des images

Les images proviennent de sources officielles ou de bases de données publiques :

- [Nom de la source] — [URL]
- [Autre source éventuelle] — [URL]

## Validation du formulaire

Chaque champ est vérifié par une expression régulière. Le message d'erreur s'affiche sous le champ à la sortie (`blur`), et le formulaire ne peut pas être envoyé tant qu'un champ est invalide.

| Champ | Expression régulière | Règle |
| --- | --- | --- |
| `id` | `/^#\d{3}$/` | `#` suivi de 3 chiffres |
| `name` | `/^[A-Za-zÀ-ÿ0-9' .-]{2,40}$/` | 2 à 40 caractères |
| `type` | liste fixe (`<select>`) ou `/^(Feu\|Eau\|Plante)$/` | valeur parmi une liste fixe *(adapte à ton univers)* |
| `level` | `/^[A-Za-zÀ-ÿ0-9 '-]{1,30}$/` | texte court |
| `stats` | `/^(0\|[1-9]\d{0,2})$/` | nombre entier de 0 à 999 |
| `image` | `/^https:\/\/\S+$/` | lien `https` |
| `description` | `/^[\s\S]{10,200}$/` | 10 à 200 caractères |

### Tests dans la console

Au moins 2 valeurs valides et 2 valeurs invalides par expression régulière.

```js
// id
const idRegex = /^#\d{3}$/;
idRegex.test("#001");   // true
idRegex.test("#999");   // true
idRegex.test("001");    // false (pas de #)
idRegex.test("#12");    // false (2 chiffres)

// name
const nameRegex = /^[A-Za-zÀ-ÿ0-9' .-]{2,40}$/;
nameRegex.test("Pikachu");   // true
nameRegex.test("Mr. Mime");  // true
nameRegex.test("A");         // false (trop court)
nameRegex.test("<script>");  // false (caractères interdits)

// stats (0 à 999)
const statRegex = /^(0|[1-9]\d{0,2})$/;
statRegex.test("0");      // true
statRegex.test("999");    // true
statRegex.test("1000");   // false (supérieur à 999)
statRegex.test("-5");     // false (négatif)

// image
const imageRegex = /^https:\/\/\S+$/;
imageRegex.test("https://example.com/001.png");  // true
imageRegex.test("https://img.site.com/a.jpg");   // true
imageRegex.test("http://example.com/001.png");   // false (http)
imageRegex.test("example.com/001.png");          // false (pas de protocole)

// description
const descRegex = /^[\s\S]{10,200}$/;
descRegex.test("Une courte description.");  // true
descRegex.test("Dix lettres");              // true
descRegex.test("Trop court");               // false (9 caractères)
descRegex.test("a".repeat(201));            // false (201 caractères)
```

> Remplace ces tests par les résultats **réels** obtenus avec tes propres expressions régulières.

## Accessibilité et responsive

- Interface testée de **360 px à 1440 px** sans débordement
- Styles de focus visibles sur tous les éléments cliquables
- États survol, focus, erreur et désactivé cohérents avec la maquette

## Organisation du travail

- **Commits** réguliers avec des messages clairs
- **GitHub Projects** : une carte par modification et par fonctionnalité → [lien vers le tableau](https://github.com/users/TON-PSEUDO/projects/N)

## Auteur

**[Ton prénom et nom]** — Simplon, brief individuel (19/10 – 26/10)