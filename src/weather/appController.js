import { appState } from "./state";
import settingsController from "../settings/settingsController";
import { loadCities, saveCities, saveCurrentCity } from "../storage";
import { getWeather } from "./api";
import { createWeatherLayout } from "./layout";
import { renderWeather } from "./renderer";

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

    showView("weatherView");
  } catch (error) {
    console.error("Failed to select city:", error);
  }
}
