import "./styles.css";
import {
  createWeatherLayout,
  createSearchLayout,
  createSettingsLayout,
} from "./layout";
import { renderWeather } from "./renderer";
import { getWeather } from "./api";
import { loadCurrentCity, loadCities } from "../storage";
import { initSearch } from "./searchController";
import { bindNavBar } from "./screenController";
import { appState } from "./state";
import settingsController from "../settings/settingsController";

async function init() {
  const app = document.querySelector("#weather");
  const currentCity = loadCurrentCity();

  if (!currentCity) {
    app.append(createSearchLayout());
    initSearch();
  } else {
    app.append(createWeatherLayout());
    const weatherData = await getWeather(currentCity);
    renderWeather(appState.weatherData, settingsController.settings);
    bindNavBar();
  }
}

init();

export function initializeApp() {
  appState.savedCities = loadCities();
  appState.currentCity = loadCurrentCity();
  settingsController.applySettings();
}
