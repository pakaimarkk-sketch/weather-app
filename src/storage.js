const CITIES_KEY = "cities";
const CURRENT_CITY_KEY = "currentCity";

export function saveCities(cities) {
  localStorage.setItem(CITIES_KEY, JSON.stringify(cities));
}

export function loadCities() {
  return JSON.parse(localStorage.getItem(CITIES_KEY)) ?? [];
}

export function saveCurrentCity(city) {
  localStorage.setItem(CURRENT_CITY_KEY, JSON.stringify(city));
}

export function loadCurrentCity() {
  return JSON.parse(localStorage.getItem(CURRENT_CITY_KEY)) ?? null;
}
