export function downloadBlob(blob, name) {
  const link = document.createElement('a');

  link.download = name;
  link.href = URL.createObjectURL(blob);
  link.click();
}
