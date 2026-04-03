const CITIES_KEY = "cities";
const CURRENT_CITY_KEY = "currentCity";
const SETTINGS_KEY = "weatherSettings";

export function saveSettings(settings) {
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
}

export function loadSettings(defaultSettings) {
  const saved = localStorage.getItem(SETTINGS_KEY);

  if (!saved) return { ...defaultSettings };

  try {
    return { ...defaultSettings, ...JSON.parse(saved) };
  } catch {
    return { ...defaultSettings };
  }
}

export function saveCities(cities) {
  localStorage.setItem(CITIES_KEY, JSON.stringify(cities));
}

export function loadCities() {
  const saved = localStorage.getItem(CITIES_KEY);

  if (!saved) return [];

  try {
    return JSON.parse(saved);
  } catch {
    return [];
  }
}

export function saveCurrentCity(city) {
  localStorage.setItem(CURRENT_CITY_KEY, JSON.stringify(city));
}

export function loadCurrentCity() {
  const saved = localStorage.getItem(CURRENT_CITY_KEY);

  if (!saved) return null;

  try {
    return JSON.parse(saved);
  } catch {
    return null;
  }
}
