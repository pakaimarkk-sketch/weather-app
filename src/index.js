import "./styles.css";

import { getWeather } from "./api";
import { renderWeather } from "./renderer";

async function init() {
  const weather = await getWeather();
  renderWeather(weather);
}

init();
