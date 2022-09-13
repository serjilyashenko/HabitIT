export function CrushComponentMock() {
  throw new CrushError('The component crushed');
}

export class CrushError extends Error {
  constructor(message) {
    super(message);

    this.stack = this.stack
      .split('\n')
      .filter(
        (line) =>
          !line.includes('node_modules') && !line.includes('CrushComponentMock')
      )
      .join('\n');
  }
}
