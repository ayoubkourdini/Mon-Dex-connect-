// =============================================================
// data.js — les créatures de VOTRE univers
// =============================================================
// TODO : remplissez ce tableau avec au moins 12 créatures
// (Pokémon, Digimon ou Yu-Gi-Oh!), en respectant ce format :
//
// {
//   id: "#001",                                   // "#" suivi de 3 chiffres
//   name: "Exemple",                              // texte
//   type: "Feu",                                  // une valeur d'une liste fixe
//   level: "Base",                                // texte
//   stats: { hp: 45, attack: 49, defence: 49 },   // 3 nombres de 0 à 999
//   image: "https://example.com/001.png",         // lien https vers une image
//   description: "Une courte description."        // 10 à 200 caractères
// }
//
// Pensez à citer la source de vos images dans le README.

 const creatures = [
  {
    id: "#001",
    name: "Bulbasaur",
    type: ["Plante"],
    level: "Base",
    stats: { hp: 45, attack: 49, defence: 49 },
    image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png",
    description: "Un Pokémon graine qui porte un bulbe sur le dos et le nourrit grâce au soleil."
  },
  {
    id: "#004",
    name: "Charmander",
    type: ["Feu"],
    level: "Base",
    stats: { hp: 39, attack: 52, defence: 43 },
    image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/4.png",
    description: "Un petit lézard dont la flamme au bout de la queue reflète sa santé."
  },
  {
    id: "#006",
    name: "Charizard",
    type: ["Feu"],
    level: "Final",
    stats: { hp: 78, attack: 84, defence: 78 },
    image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/6.png",
    description: "Un dragon ailé qui crache des flammes brûlantes et vole très haut."
  },
  {
    id: "#007",
    name: "Squirtle",
    type: ["Eau"],
    level: "Base",
    stats: { hp: 44, attack: 48, defence: 65 },
    image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/7.png",
    description: "Une petite tortue qui se protège dans sa carapace et lance des jets d'eau."
  },
  {
    id: "#025",
    name: "Pikachu",
    type: ["Électrik"],
    level: "Intermédiaire",
    stats: { hp: 35, attack: 55, defence: 40 },
    image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png",
    description: "Une souris électrique qui stocke l'énergie dans les poches de ses joues."
  },
  {
    id: "#039",
    name: "Jigglypuff",
    type: ["Fée"],
    level: "Base",
    stats: { hp: 115, attack: 45, defence: 20 },
    image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/39.png",
    description: "Sa berceuse endort tous ceux qui l'entendent, même les plus agités."
  },
  {
    id: "#052",
    name: "Meowth",
    type: ["Normal"],
    level: "Base",
    stats: { hp: 40, attack: 45, defence: 35 },
    image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/52.png",
    description: "Un chat rusé qui adore les objets brillants, surtout les pièces."
  },
  {
    id: "#054",
    name: "Psyduck",
    type: ["Eau"],
    level: "Base",
    stats: { hp: 50, attack: 52, defence: 48 },
    image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/54.png",
    description: "Un canard distrait qui a souvent mal à la tête et libère alors ses pouvoirs."
  },
  {
    id: "#066",
    name: "Machop",
    type: ["Combat"],
    level: "Base",
    stats: { hp: 70, attack: 80, defence: 50 },
    image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/66.png",
    description: "Un Pokémon musclé qui s'entraîne sans relâche et soulève des charges énormes."
  },
  {
    id: "#074",
    name: "Geodude",
    type: ["Roche"],
    level: "Base",
    stats: { hp: 40, attack: 80, defence: 100 },
    image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/74.png",
    description: "Un rocher vivant qu'on confond facilement avec une pierre au bord du chemin."
  },
  {
    id: "#092",
    name: "Gastly",
    type: ["Spectre"],
    level: "Base",
    stats: { hp: 30, attack: 35, defence: 30 },
    image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/92.png",
    description: "Un être de gaz toxique qui flotte dans l'ombre et surprend les passants."
  },
  {
    id: "#094",
    name: "Gengar",
    type: ["Spectre"],
    level: "Final",
    stats: { hp: 60, attack: 65, defence: 60 },
    image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/94.png",
    description: "Une ombre malicieuse qui se cache dans le noir et aime faire des farces."
  }
];
