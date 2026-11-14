const BASE_URL = "https://pokeapi.co/api/v2";

export async function getCreatureList(offset) {
    try {
        const response = await fetch(`${BASE_URL}/pokemon?limit=20&offset=${offset}`); 
        if (!response.ok) {
            throw new Error(`Erreur ${response.status}`);
        }
        const data = await response.json();
        return data.results;
    } catch (error) {
        throw error;
    }
}

export async function getCreatureDetails(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Erreur ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch(error) {
        throw error;
    }
}

export async function getCreatures(offset) {
    const list = await getCreatureList(offset);
    const requests = list.map(creature => getCreatureDetails(creature.url))
    const details = await Promise.all(requests);
    const creatures = details.map(creature => toCreature(creature)) 
    return creatures;
}

function toCreature(data) {
    return {
        id: data.id,
        name: data.name,
        type: data.types[0].type.name,
        image: data.sprites.front_default, 
        stats: data.stats.map(stat => ({
            name: stat.stat.name,
            value: stat.base_stat
        })),
        height: data.height,
        weight: data.weight
    }
}

export async function searchCreature (name) {
    try {
        const response = await fetch(`${BASE_URL}/pokemon/${name}`);
        if (!response.ok) {
            throw new Error(`Erreur ${response.status}`);
        }
        const data = await response.json();
        return toCreature(data);
    }
    catch (error) {
        throw error;
    }
}