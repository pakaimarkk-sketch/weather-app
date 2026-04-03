import { appState } from "./state";

import {
  createSettingsLayout,
  createSearchLayout,
  createWeatherLayout,
} from "./layout";

const views = {
  searchView: {
    create: () => createSearchLayout(),
    bind: () => initSearch(),
    render: () => {},
  },
  weatherView: {
    create: () => createWeatherLayout(),
    bind: () => bindNavBar(),
    render: () => {},
  },

  settingsView: {
    create: () => createSettingsLayout(),
    bind: () => bindNavBar(),
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

function showView(viewName) {
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
