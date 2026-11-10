const BASE_URL = "https://pokeapi.co/api/v2";

export async function getCreatureList(offset) {
    try {
        const response = await fetch(`${BASE_URL}/pokemon?limit=20&offset=${offset}`); 
        if (!response.ok) {
            throw new Error(`Erreur ${response.status}`)
        }
        const data = await response.json();
        return data.results
    } catch (error) {
        throw error;
    }
}