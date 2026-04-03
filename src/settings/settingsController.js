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

    if (appState.weatherData) {
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
}

const settingsController = new SettingsController();

export default settingsController;
