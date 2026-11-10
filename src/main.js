import { getCreatures } from "./services/api.js";

async function test() {
    const list = await getCreatures(0);
    console.log(list);
}
test();