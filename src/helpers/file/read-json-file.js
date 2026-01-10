import { readFile } from './read-file.js';

export async function readJsonFile(file) {
  try {
    const content = await readFile(file);
    return JSON.parse(content);
  } catch {
    throw new Error(`Could not read JSON file: ${file?.fullName}`);
  }
}
