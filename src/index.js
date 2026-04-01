import "./styles.css";
import { createWeatherLayout, createSearchLayout } from "./layout";
import { renderWeather } from "./renderer";
import { getWeather } from "./api";
import { loadCurrentCity } from "./storage";
import { initSearch } from "./searchController";

async function init() {
  const app = document.querySelector("#weather");
  const currentCity = loadCurrentCity();

  if (!currentCity) {
    app.append(createSearchLayout());
    initSearch();
  } else {
    app.append(createWeatherLayout());
    const weatherData = await getWeather(currentCity);
    renderWeather(weatherData);
  }
}

init();
