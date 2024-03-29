import { StorageOptions, STORAGE_TYPES } from "./storage-utils.types";
import { LibroSession } from "../session/session.types";
import { LibroConfig } from "../config/config.types";

export function initStorage<T extends LibroSession | LibroConfig>(
  storageType: STORAGE_TYPES,
  storageName: string,
  initialStorage: LibroSession | LibroConfig
): StorageOptions<T> {
  try {
    window[storageType].setItem(storageName, JSON.stringify(initialStorage));
    return initialStorage;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export function getStorageData<T extends LibroSession | LibroConfig>(
  storageType: STORAGE_TYPES,
  storageName: string
): StorageOptions<T> {
  try {
    const value = JSON.parse(window[storageType].getItem(storageName));
    return value;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export function setupStorage<T extends LibroSession | LibroConfig>(
  storageType: STORAGE_TYPES,
  storageName: string,
  data: LibroSession | LibroConfig
): StorageOptions<T> {
  try {
    window[storageType].setItem(storageName, JSON.stringify(data));
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export function setStorageValue<T extends LibroSession | LibroConfig>(
  storageType: STORAGE_TYPES,
  storageName: string,
  key: string,
  value: string
): StorageOptions<T> {
  try {
    const initialState = getStorageData(storageType, storageName);
    if (!initialState) {
      throw new Error("Can't find initial state");
    }
    const newState = {
      ...initialState,
      [key]: value
    };

    window[storageType].setItem(storageName, JSON.stringify(newState));
    return newState;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export function clearStorage(
  storageType: STORAGE_TYPES,
  storageName: string
): void {
  try {
    window[storageType].removeItem(storageName);
  } catch (error) {
    console.log(error);
  }
}
