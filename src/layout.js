import "./weather.css";
import {
  createDiv,
  createEl,
  createTextDiv,
  createTextElement,
  createButton,
  createInput,
} from "../utils/domHelpers";
import { initSwipe } from "./swipeController";

function getFormattedDate() {
  return new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
}

export function createWeatherLayout() {
  const app = createDiv("weather-app");
  const track = createDiv(null, "panel-track");

  const panelOverview = createDiv(null, "panel", "panel-overview");
  const date = createTextElement("p", getFormattedDate(), null, "header-date");
  const city = createTextElement("p", "—", null, "header-city");
  const main = createDiv(null, "overview-main");
  const condition = createTextElement("p", "—", null, "weather-condition");
  const temp = createTextElement("p", "—°", null, "weather-temp");
  const icon = createTextDiv("🌤️", null, "weather-icon");

  const header = createDiv(null, "overview-header");

  const forecast = createDiv(null, "forecast-strip");
  panelOverview.append(header, main, forecast);

  header.append(date, city);
  main.append(icon, condition, temp);

  const panelDetail = createDiv(null, "panel", "panel-detail");

  const detailHeader = createDiv(null, "detail-header");
  const detailDate = createTextElement(
    "p",
    getFormattedDate(),
    null,
    "header-date",
  );
  const detailCity = createTextElement("p", "—", null, "detail-city");

  detailHeader.append(detailDate, detailCity);

  const detailRows = createDiv(null, "detail-rows");

  panelDetail.append(detailHeader, detailRows);

  track.append(panelOverview, panelDetail);
  app.append(track);

  const navBar = createDiv(null, "nav-bar");

  const addBtn = createButton("+", null, "nav-btn", "nav-add");
  const settingsBtn = createButton("⚙", null, "nav-btn", "nav-settings");

  const dotIndicator = createDiv(null, "dot-indicator");
  const dot1 = createDiv(null, "dot", "active");
  const dot2 = createDiv(null, "dot");
  dotIndicator.append(dot1, dot2);

  navBar.append(addBtn, dotIndicator, settingsBtn);
  app.append(track, navBar);

  initSwipe(track, 320, [dot1, dot2]);

  return app;
}

export function createSearchLayout() {
  const app = createDiv("search-app");

  const header = createDiv(null, "search-header");
  const title = createTextElement("h1", "Select City", null, "search-title");
  header.append(title);

  const inputWrapper = createDiv(null, "search-input-wrapper");
  const input = createInput("text", "search-input", "City name...");
  inputWrapper.append(input);

  const locationBtn = createButton(
    "📍 Current location",
    null,
    "search-location-btn",
  );

  const cityList = createEl("ul", "search-city-list");

  app.append(header, inputWrapper, locationBtn, cityList);

  return app;
}
