import { localStorageKey } from "../const";

export function getMemoState() {
  try {
    const memoState = localStorage.getItem("localStorageKey");
    return JSON.parse(memoState);
  } catch (error) {
    return {
      error,
    };
  }
}

export function setMemoState(state) {
  localStorage.setItem(localStorageKey, JSON.stringify(state));
}
