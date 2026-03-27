import { promises as fs } from "fs";
import path from "path";

const STORE_PATH = path.join(process.cwd(), "data", "mongolway-db.json");

export async function readLocalStore() {
  const content = await fs.readFile(STORE_PATH, "utf8");
  return JSON.parse(content);
}

export async function writeLocalStore(store) {
  await fs.writeFile(STORE_PATH, `${JSON.stringify(store, null, 2)}\n`, "utf8");
}

export async function updateLocalStore(mutator) {
  const store = await readLocalStore();
  const result = await mutator(store);
  await writeLocalStore(store);
  return result;
}
