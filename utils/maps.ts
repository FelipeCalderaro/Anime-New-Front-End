export function sortMapWithNullFirst<K, V>(map: Map<K, V>): Map<K, V> {
  // Extract the keys and sort them with null first and then ascending order for numbers
  const sortedKeys = Array.from(map.keys()).sort((a, b) => {
    if (a === null) return -1;
    if (b === null) return 1;
    return (b as number) - (a as number);
  });

  // Create a new map with the sorted order of keys
  const sortedMap = new Map<K, V>();
  for (const key of sortedKeys) {
    sortedMap.set(key, map.get(key)!);
  }

  return sortedMap;
}