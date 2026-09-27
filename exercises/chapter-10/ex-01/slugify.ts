export function slugify(text: string) {
  return text
    .trim()
    .toLowerCase()
    .replaceAll(/[ -]+/g, "-")
    .replaceAll(/[^a-zA-Z0-9-]/g, "");
}
