import { appState } from "./state";
import {
  createSettingsLayout,
  createSearchLayout,
  createWeatherLayout,
} from "./layout";
import { renderWeather } from "./renderer";
import settingsController from "../settings/settingsController";
import { initSearch } from "./searchController";

const views = {
  searchView: {
    create: () => createSearchLayout(),
    bind: () => {
      initSearch();
      bindNavBar();
    },
    render: () => {},
  },
  weatherView: {
    create: () => createWeatherLayout(),
    bind: () => {
      bindNavBar();
      bindForecastStrip();
      bindOverviewPanel();
    },
    render: () =>
      renderWeather(
        appState.weatherData,
        settingsController.settings,
        appState.selectedDayIndex,
      ),
  },

  settingsView: {
    create: () => createSettingsLayout(),
    bind: () => {
      bindNavBar();
      settingsController.bindSettingsUI();
    },
    render: () => {},
  },
};

function updateUI() {
  const main = document.getElementById("weather");

  const currentView = views[appState.currentScreen];

  if (!main || !currentView) return;

  main.innerHTML = "";
  main.appendChild(currentView.create());
  currentView.bind();
  currentView.render();
}

export function showView(viewName) {
  appState.currentScreen = viewName;
  updateUI();
}

export function bindNavBar() {
  const navbar = document.querySelector(".nav-bar");
  if (!navbar) return;

  navbar.addEventListener("click", (e) => {
    const button = e.target.closest("button[data-target]");
    if (!button) return;
    showView(button.dataset.target);
  });
}

export function bindForecastStrip() {
  const strip = document.querySelector(".forecast-strip");

  if (!strip) return;

  strip.addEventListener("click", (e) => {
    console.log("clicked strip", e.target);
    const item = e.target.closest(".forecast-day");
    if (!item) return;

    appState.selectedDayIndex = Number(item.dataset.index);
    renderWeather(
      appState.weatherData,
      settingsController.settings,
      appState.selectedDayIndex,
    );
  });
}

export function bindOverviewPanel() {
  const overviewPanel = document.querySelector(".panel-overview");
  if (!overviewPanel || !appState.swipeController) return;

  overviewPanel.addEventListener("click", (e) => {
    if (e.target.closest(".forecast-strip")) return;
    appState.swipeController.goTo(1);
  });
}
