export const veryFirstStorageVersion = 1;
export const actualStorageVersion = 2;

export function constructLocalStorageKey(version = actualStorageVersion) {
  return `habitit-v${version}.0`;
}

export const localStorageKey = constructLocalStorageKey(actualStorageVersion);
