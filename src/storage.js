const CITIES_KEY = "cities";

export function saveCities(city) {
  localStorage.setItem(CITIES_KEY, JSON.stringify(city));
}

export function loadCities() {
  return JSON.parse(localStorage.getItem(CITIES_KEY)) ?? [];
}
