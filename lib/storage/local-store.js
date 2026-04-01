import { promises as fs } from "fs";
import path from "path";
import { logWarn } from "@/lib/logging";

const DEFAULT_STORE_PATH = path.join(process.cwd(), "data", "mongolway-db.json");
let memoryStore = null;
let memoryFallbackReason = null;
let storeOperationChain = Promise.resolve();

function buildEmptyStore() {
  return {
    site: {},
    guides: [],
    tours: [],
    bookings: [],
    paymentSessions: [],
    emailLeads: [],
    emailOutbox: [],
    users: [],
    authSessions: []
  };
}

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function getStorePath() {
  const customPath = String(process.env.MONGOLWAY_LOCAL_STORE_PATH || "").trim();
  return customPath ? path.resolve(customPath) : DEFAULT_STORE_PATH;
}

function isRecoverableStoreError(error) {
  return ["EROFS", "EACCES", "EPERM", "ENOENT"].includes(error?.code);
}

function activateMemoryFallback(store, error) {
  memoryStore = clone(store);
  memoryFallbackReason = error?.code || error?.message || "unknown";

  logWarn("local_store_memory_fallback_enabled", {
    path: getStorePath(),
    reason: memoryFallbackReason
  });
}

export function getLocalStoreStatus() {
  return {
    path: getStorePath(),
    mode: memoryStore ? "memory" : "file",
    fallbackReason: memoryFallbackReason
  };
}

export function isLocalStoreUsingMemoryFallback() {
  return Boolean(memoryStore);
}

function withStoreLock(operation) {
  const nextOperation = storeOperationChain.then(operation, operation);
  storeOperationChain = nextOperation.then(
    () => undefined,
    () => undefined
  );
  return nextOperation;
}

async function readStoreFile(filePath) {
  const content = await fs.readFile(filePath, "utf8");
  return JSON.parse(content);
}

async function getSeedStore() {
  const storePath = getStorePath();

  if (storePath !== DEFAULT_STORE_PATH) {
    try {
      return await readStoreFile(DEFAULT_STORE_PATH);
    } catch {}
  }

  return buildEmptyStore();
}

async function readLocalStoreUnlocked() {
  if (memoryStore) {
    return clone(memoryStore);
  }

  try {
    return await readStoreFile(getStorePath());
  } catch (error) {
    if (error instanceof SyntaxError) {
      const fallbackStore = await getSeedStore();
      activateMemoryFallback(fallbackStore, error);
      return clone(fallbackStore);
    }

    if (error?.code === "ENOENT") {
      const fallbackStore = await getSeedStore();
      await writeLocalStoreUnlocked(fallbackStore);
      return clone(fallbackStore);
    }

    throw error;
  }
}

async function writeLocalStoreUnlocked(store) {
  if (memoryStore) {
    memoryStore = clone(store);
    return;
  }

  try {
    const storePath = getStorePath();
    const directoryPath = path.dirname(storePath);
    const temporaryPath = path.join(
      directoryPath,
      `.mongolway-db-${process.pid}-${Date.now()}-${Math.random().toString(16).slice(2)}.tmp`
    );

    await fs.mkdir(directoryPath, { recursive: true });
    await fs.writeFile(temporaryPath, `${JSON.stringify(store, null, 2)}\n`, "utf8");
    await fs.rename(temporaryPath, storePath);
  } catch (error) {
    if (!isRecoverableStoreError(error)) {
      throw error;
    }

    activateMemoryFallback(store, error);
  }
}

export async function readLocalStore() {
  return withStoreLock(() => readLocalStoreUnlocked());
}

export async function writeLocalStore(store) {
  return withStoreLock(() => writeLocalStoreUnlocked(store));
}

export async function updateLocalStore(mutator) {
  return withStoreLock(async () => {
    const store = await readLocalStoreUnlocked();
    const writableStore = clone(store);
    const result = await mutator(writableStore);
    await writeLocalStoreUnlocked(writableStore);
    return result;
  });
}
