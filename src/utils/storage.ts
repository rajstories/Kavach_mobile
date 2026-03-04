import AsyncStorage from '@react-native-async-storage/async-storage';

const PREFIX = '@kavach:';

export async function setItem<T>(key: string, value: T): Promise<void> {
  try {
    const json = JSON.stringify(value);
    await AsyncStorage.setItem(`${PREFIX}${key}`, json);
  } catch (e) {
    console.error(`[Storage] setItem error for key "${key}":`, e);
  }
}

export async function getItem<T>(key: string): Promise<T | null> {
  try {
    const json = await AsyncStorage.getItem(`${PREFIX}${key}`);
    return json ? (JSON.parse(json) as T) : null;
  } catch (e) {
    console.error(`[Storage] getItem error for key "${key}":`, e);
    return null;
  }
}

export async function removeItem(key: string): Promise<void> {
  try {
    await AsyncStorage.removeItem(`${PREFIX}${key}`);
  } catch (e) {
    console.error(`[Storage] removeItem error for key "${key}":`, e);
  }
}

export async function clearAll(): Promise<void> {
  try {
    const keys = await AsyncStorage.getAllKeys();
    const kavachKeys = keys.filter((k) => k.startsWith(PREFIX));
    await AsyncStorage.multiRemove(kavachKeys);
  } catch (e) {
    console.error('[Storage] clearAll error:', e);
  }
}

export async function getAllKeys(): Promise<string[]> {
  try {
    const keys = await AsyncStorage.getAllKeys();
    return keys
      .filter((k) => k.startsWith(PREFIX))
      .map((k) => k.replace(PREFIX, ''));
  } catch (e) {
    console.error('[Storage] getAllKeys error:', e);
    return [];
  }
}
