export async function isHotIn(
  weatherClient: (city: string) => Promise<number>,
  city: string,
) {
  const degrees = await weatherClient(city);

  if (degrees > 25) {
    return true;
  }

  return false;
}
