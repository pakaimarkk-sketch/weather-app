export function normalizeString(str) {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

export function searchCities(query, cities) {
  if (!query) return cities;
  const normalized = normalizeString(query);
  return cities.filter((city) => normalizeString(city).includes(normalized));
}
