
export function isImageFile(file: File): boolean {
  return file.name.match(/.(jpg|jpeg|png)$/i) != null;
}
