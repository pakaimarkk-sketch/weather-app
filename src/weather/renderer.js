import { createDiv, createTextElement } from "../../utils/domHelpers";

import { formatHour } from "../../utils/utils";

import { createImg } from "../../utils/domHelpers";

import { formatTemperature, formatWindSpeed } from "../settings/settings";

import { startClock } from "./time";

import { getWeatherIcon } from "./iconMap";

import { iconSets } from "./iconMap";

export function renderWeather(weatherData, settings, selectedDayIndex = 0) {
  if (!weatherData) return;

  const forecast = weatherData.details;
  const selectedDay = weatherData.details[selectedDayIndex];
  const isToday = selectedDayIndex === 0;

  renderPreview(weatherData.current, weatherData.city, settings);
  renderForecast(forecast, settings, selectedDayIndex);
  renderHourlyForecast(selectedDay.hours, settings, isToday);
  renderDetails(selectedDay, weatherData.current, weatherData.city, settings);
}

function renderPreview(current, city, settings) {
  document.querySelector(".header-city").textContent = city;
  startClock(current.timezone);
  document.querySelector(".weather-condition").textContent = current.conditions;
  document.querySelector(".weather-temp").textContent = formatTemperature(
    current.temp,
    settings.tempUnit,
  );
  document.querySelector(".weather-humidity").textContent =
    `Humidity ${current.humidity}%`;

  document.querySelector(".weather-windspeed").textContent =
    `Wind ${formatWindSpeed(current.windspeed, settings.windspeedUnit)}`;
  document.querySelector(".weather-icon").src = getWeatherIcon(
    current.icon,
    settings,
  );
  document.querySelector(".weather-icon").alt =
    current.conditions || current.icon || "Weather icon";
}

function renderForecast(forecast, settings, selectedDayIndex) {
  const strip = document.querySelector(".forecast-strip");
  strip.textContent = "";

  forecast.forEach((day, forecastIndex) => {
    const detailIndex = forecastIndex;

    const dayEl = createDiv(null, "forecast-day");
    if (detailIndex === selectedDayIndex) {
      dayEl.classList.add("active");
    }

    dayEl.dataset.index = detailIndex;

    const date = createTextElement(
      "p",
      getDayDate(day.datetime),
      null,
      "forecast-day-name",
    );

    const name = createTextElement(
      "p",
      getDayName(day.datetime),
      null,
      "forecast-day-name",
    );

    const icon = createImg(
      getWeatherIcon(day.icon, settings),
      day.conditions || day.icon || "Forecast icon",
      null,
      "forecast-day-icon",
    );

    const temp = createTextElement(
      "p",
      `${formatTemperature(day.tempmin, settings.tempUnit)} / ${formatTemperature(day.tempmax, settings.tempUnit)}`,
      null,
      "forecast-day-temp",
    );

    const precip = createTextElement(
      "p",
      `${day.precipprob ?? 0}%`,
      null,
      "forecast-day-precip",
    );

    dayEl.append(date, name, icon, temp, precip);
    strip.append(dayEl);
  });
}

function renderDetails(day, current, city, settings) {
  document.querySelector(".detail-city").textContent = city;
  document.querySelector(".detail-date").textContent = formatHeaderDate(
    day.datetime,
  );

  const rows = [
    {
      icon: "thermometer",
      label: "Daily average temperature",
      value: formatTemperature(day.temp, settings.tempUnit),
    },
    {
      icon: "thermometer-colder",
      label: "Min",
      value: formatTemperature(day.tempmin, settings.tempUnit),
    },
    {
      icon: "thermometer-colder",
      label: "Feels like min",
      value: formatTemperature(day.feelslikemin, settings.tempUnit),
    },
    {
      icon: "thermometer-warmer",
      label: "Max",
      value: formatTemperature(day.tempmax, settings.tempUnit),
    },
    {
      icon: "thermometer-warmer",
      label: "Feels like max",
      value: formatTemperature(day.feelslikemax, settings.tempUnit),
    },
    {
      icon: "humidity",
      label: "Humidity",
      value: `${day.humidity}%`,
    },
    {
      icon: "windsock",
      label: "Wind",
      value: formatWindSpeed(day.windspeed, settings.windspeedUnit),
    },
    {
      icon: "raindrop",
      label: "Rain chance",
      value: `${day.precipprob ?? 0}%`,
    },
  ];

  const detailRows = document.querySelector(".detail-rows");
  detailRows.textContent = "";

  rows.forEach(({ label, icon, value }) => {
    const row = createDiv(null, "detail-row");

    const left = createDiv(null, "detail-left");
    const iconEl = createImg(
      getWeatherIcon(icon, settings),
      label,
      null,
      "detail-icon",
    );
    const labelEl = createTextElement("p", label, null, "detail-label");

    const valueEl = createTextElement("p", value, null, "detail-value");

    left.append(iconEl, labelEl);
    row.append(left, valueEl);
    detailRows.append(row);
  });
}

function getDayDate(dateString) {
  const date = new Date(dateString);

  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${month}.${day}`;
}

function getDayName(dateString) {
  return new Date(dateString).toLocaleDateString("en-US", { weekday: "short" });
}

function formatHeaderDate(dateString) {
  return new Date(dateString).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
}

function renderHourlyForecast(hours = [], settings) {
  const strip = document.querySelector(".hourly-forecast-strip");
  if (!strip) return;

  strip.textContent = "";

  const filteredHours = hours.filter((hour) => {
    const hourValue = Number(hour.datetime.split(":")[0]);
    return hourValue % 2 === 0;
  });

  filteredHours.forEach((hour) => {
    const hourEl = createDiv(null, "hourly-forecast-item");

    const time = createTextElement(
      "p",
      formatHour(hour.datetime, settings.timeFormat),
      null,
      "hourly-time",
    );

    const icon = createImg(
      getWeatherIcon(hour.icon, settings),
      hour.conditions || hour.icon || "Hourly icon",
      null,
      "hourly-icon",
    );

    const temp = createTextElement(
      "p",
      formatTemperature(hour.temp, settings.tempUnit),
      null,
      "hourly-temp",
    );

    const humidity = createTextElement(
      "p",
      `${hour.humidity}%`,
      null,
      "hourly-humidity",
    );

    const wind = createTextElement(
      "p",
      formatWindSpeed(hour.windspeed, settings.windspeedUnit),
      null,
      "hourly-wind",
    );

    const precip = createTextElement(
      "p",
      `${hour.precipprob ?? 0}%`,
      null,
      "hourly-precip",
    );

    hourEl.append(time, icon, temp, humidity, wind, precip);
    strip.append(hourEl);
  });
}
