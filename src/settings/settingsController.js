import { appState } from "../weather/state";
import { renderWeather } from "../weather/renderer";
import { saveSettings, loadSettings } from "../storage";
import { defaultSettings } from "./settings";
import { applyTheme } from "./settings";

class SettingsController {
  constructor() {
    this.settings = loadSettings(defaultSettings);
  }

  getSettings() {
    return this.settings;
  }

  updateSetting(key, value) {
    this.settings[key] = value;
    saveSettings(this.settings);
    this.applySettings();
  }

  applySettings() {
    applyTheme(this.settings.appearance);

    if (appState.weatherData && appState.currentScreen === "weatherView") {
      renderWeather(
        appState.weatherData,
        this.settings,
        appState.selectedDayIndex,
      );
    }
  }

  setTempUnit(value) {
    this.updateSetting("tempUnit", value);
  }

  setWindspeedUnit(value) {
    this.updateSetting("windspeedUnit", value);
  }

  setPressureUnit(value) {
    this.updateSetting("pressureUnit", value);
  }

  setTimeFormat(value) {
    this.updateSetting("timeFormat", value);
  }

  setAppearance(value) {
    this.updateSetting("appearance", value);
  }

  bindSettingsUI() {
    const bindings = [
      { name: "temperature-unit", handler: this.setTempUnit.bind(this) },
      { name: "wind-unit", handler: this.setWindspeedUnit.bind(this) },
      { name: "pressure-unit", handler: this.setPressureUnit.bind(this) },
      { name: "time-format", handler: this.setTimeFormat.bind(this) },
      { name: "theme-mode", handler: this.setAppearance.bind(this) },
    ];

    bindings.forEach(({ name, handler }) => {
      document.querySelectorAll(`input[name="${name}"]`).forEach((input) => {
        input.addEventListener("change", (e) => {
          handler(e.target.value);
        });
      });
    });
  }
}
const settingsController = new SettingsController();

export default settingsController;
