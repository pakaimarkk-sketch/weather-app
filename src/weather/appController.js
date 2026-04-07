import { appState } from "./state";
import { loadCities, saveCities, saveCurrentCity } from "../storage";
import { getWeather } from "./api";
import { showView } from "./screenController";

export async function selectCity(city) {
  const normalizedCity = city.trim();
  if (!normalizedCity) return;

  try {
    const weatherData = await getWeather(normalizedCity);

    const cities = loadCities();
    const alreadyExists = cities.some(
      (savedCity) => savedCity.toLowerCase() === normalizedCity.toLowerCase(),
    );

    if (!alreadyExists) {
      saveCities([...cities, normalizedCity]);
    }

    saveCurrentCity(normalizedCity);
    appState.currentCity = normalizedCity;
    appState.weatherData = weatherData;
    appState.selectedDayIndex = 0;
    appState.currentWeatherPanel = 0;

    showView("weatherView");
  } catch (error) {
    console.error("Failed to select city:", error);
  }
}
