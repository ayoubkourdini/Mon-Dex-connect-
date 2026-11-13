export function getFavorites() {
    const saved = localStorage.getItem("favorites");
    if (saved === null) {
        return [];
    }
    return JSON.parse(saved);
}

export function isFavorite(id) {
    const favorites = getFavorites();
    for (let i = 0; i < favorites.length; i++) {
        if (favorites[i].id === id) {
            return true        }
    }
    return false
}

export function toggleFavorite(creature) {
    const favorites = getFavorites();
    if (isFavorite(creature.id)) {
        for (let i = 0; i < favorites.length; i++) {
            if (favorites[i].id === creature.id) {
                favorites.splice(i, 1);
            }
        }
    } else {
        favorites.push(creature);
    }
    localStorage.setItem("favorites", JSON.stringify(favorites))
}

export function saveLastDearch () {
    sessionStorage.setItem("lastSearch", query);
}

export function getLastSearch () {
    const saved = sessionStorage.getItem("lastSearch");
    if (saved === null) {
        return "";
    }
    return saved
}