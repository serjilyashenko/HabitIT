export async function shareFile(file) {
  await navigator.share({
    files: [file],
  });
}
