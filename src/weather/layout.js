import "./weather.css";
import "../settings/settings.css";
import {
  createDiv,
  createEl,
  createTextDiv,
  createTextElement,
  createButton,
  createInput,
} from "../../utils/domHelpers";
import { initSwipe } from "../swipeController";
import { appState } from "./state";
import settingsController from "../settings/settingsController";

function getFormattedDate() {
  return new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
}

export function createWeatherLayout() {
  const app = createDiv("weatherView");
  const track = createDiv(null, "panel-track");

  const panelOverview = createDiv(null, "panel", "panel-overview");
  const date = createTextElement("p", getFormattedDate(), null, "header-date");
  const city = createTextElement("p", "—", null, "header-city");
  const main = createDiv(null, "overview-main");
  const condition = createTextElement("p", "—", null, "weather-condition");
  // const description = createTextElement("p", "—", null, "weather-description");
  const temp = createTextElement("p", "—°", null, "weather-temp");
  const icon = createTextDiv("🌤️", null, "weather-icon");
  // const feelsLike = createTextElement("p", "—", null, "weather-feelslike");
  const humidity = createTextElement("p", "—", null, "weather-humidity");
  const windspeed = createTextElement("p", "—", null, "weather-windspeed");

  const header = createDiv(null, "overview-header");
  const forecast = createDiv(null, "forecast-strip");

  header.append(date, city);
  main.append(icon, condition, temp, humidity, windspeed);
  panelOverview.append(header, main, forecast);

  const panelDetail = createDiv(null, "panel", "panel-detail");
  const detailHeader = createDiv(null, "detail-header");
  const detailDate = createTextElement(
    "p",
    getFormattedDate(),
    null,
    "detail-date",
  );
  const detailCity = createTextElement("p", "—", null, "detail-city");
  const hourlyForecast = createDiv(null, "hourly-forecast-strip");
  const detailRows = createDiv(null, "detail-rows");

  detailHeader.append(detailDate, detailCity);
  panelDetail.append(detailHeader, detailRows, hourlyForecast);

  track.append(panelOverview, panelDetail);

  const navBar = createDiv(null, "nav-bar");
  const addBtn = createButton("+", "navAdd", "nav-btn", "nav-add");
  addBtn.dataset.target = "searchView";
  const dotIndicator = createDiv(null, "dot-indicator");
  const dot1 = createDiv(null, "dot", "active");
  const dot2 = createDiv(null, "dot");
  dotIndicator.append(dot1, dot2);
  const settingsBtn = createButton(
    "⚙",
    "goSettings",
    "nav-btn",
    "nav-settings",
  );
  settingsBtn.dataset.target = "settingsView";
  navBar.append(addBtn, dotIndicator, settingsBtn);

  app.append(track, navBar);
  appState.swipeController = initSwipe(track, [dot1, dot2], {
    initialPanel: appState.currentWeatherPanel,
    onPanelChange: (panelIndex) => {
      appState.currentWeatherPanel = panelIndex;
    },
  });

  return app;
}

export function createSearchLayout() {
  const app = createDiv("searchView");

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

export function createSettingsLayout() {
  const app = createDiv("settingsView");

  const settings = settingsController.getSettings();

  const header = createDiv(null, "screen-header");
  const title = createTextElement("h1", "Settings", null, "screen-title");
  const subtitle = createTextElement(
    "p",
    "Customize units and appearance.",
    null,
    "screen-subtitle",
  );
  header.append(title, subtitle);

  const content = createDiv(null, "settings-content");

  content.append(
    createSettingsGroup("Temperature", [
      createSegmentedControl(
        "temperature-unit",
        [
          { label: "°C", value: "°C" },
          { label: "°F", value: "°F" },
        ],
        settings.tempUnit,
      ),
    ]),

    createSettingsGroup("Wind Speed", [
      createSegmentedControl(
        "wind-unit",
        [
          { label: "km/h", value: "km/h" },
          { label: "m/s", value: "m/s" },
          { label: "mph", value: "mph" },
        ],
        settings.windspeedUnit,
      ),
    ]),

    createSettingsGroup("Pressure", [
      createSegmentedControl(
        "pressure-unit",
        [
          { label: "mb", value: "mb" },
          { label: "hPa", value: "hPa" },
          { label: "mm", value: "mm" },
        ],
        settings.pressureUnit,
      ),
    ]),

    createSettingsGroup("Time Format", [
      createSegmentedControl(
        "time-format",
        [
          { label: "24h", value: "24h" },
          { label: "12h", value: "12h" },
        ],
        settings.timeFormat,
      ),
    ]),

    createSettingsGroup("Appearance", [
      createSegmentedControl(
        "theme-mode",
        [
          { label: "Light", value: "Light" },
          { label: "Dark", value: "Dark" },
        ],
        settings.appearance,
      ),
    ]),
  );

  const navBar = createDiv(null, "nav-bar");
  const addBtn = createButton("+", "navAdd", "nav-btn", "nav-add");
  addBtn.dataset.target = "searchView";
  const weatherBtn = createButton("☀", "goWeather", "nav-btn", "nav-weather");
  weatherBtn.dataset.target = "weatherView";
  navBar.append(addBtn, weatherBtn);

  app.append(header, content, navBar);

  return app;
}

function createSettingsGroup(titleText, children = []) {
  const section = createDiv(null, "settings-section");

  const title = createTextElement("h2", titleText, null, "section-title");
  const card = createDiv(null, "settings-card");

  card.append(...children);
  section.append(title, card);

  return section;
}

function createSegmentedControl(name, options = [], activeValue = null) {
  const group = createDiv(null, "segmented-control");

  options.forEach(({ label, value }) => {
    const labelEl = createEl("label", null, "segmented-option");

    const input = createInput("radio", null, "", "segmented-input");
    input.name = name;
    input.value = value;
    input.checked = value === activeValue;

    const text = createTextElement("span", label, null, "segmented-text");

    labelEl.append(input, text);
    group.append(labelEl);
  });

  return group;
}
