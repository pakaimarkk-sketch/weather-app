import {
  createDiv,
  createTextElement,
  createTextDiv,
} from "../../utils/domHelpers";

import { formatHour } from "../../utils/utils";

import {
  formatTemperature,
  formatWindSpeed,
  formatPressure,
  formatTime,
} from "../settings/settings";

export function renderWeather(weatherData, settings, selectedDayIndex = 0) {
  if (!weatherData) return;

  const forecast = weatherData.details;
  const selectedDay = weatherData.details[selectedDayIndex];
  const isToday = selectedDayIndex === 0;

  renderPreview(weatherData.current, weatherData.city, settings);
  renderForecast(forecast, settings, selectedDayIndex);
  renderHourlyForecast(selectedDay.hours, settings, isToday);
  renderDetails(selectedDay, weatherData.city, settings);
}

function renderPreview(current, city, settings) {
  document.querySelector(".header-city").textContent = city;
  document.querySelector(".weather-condition").textContent = current.conditions;
  document.querySelector(".weather-temp").textContent = formatTemperature(
    current.temp,
    settings.tempUnit,
  );
  document.querySelector(".weather-humidity").textContent =
    `Humidity ${current.humidity}%`;

  document.querySelector(".weather-windspeed").textContent =
    `Wind ${formatWindSpeed(current.windspeed, settings.windspeedUnit)}`;
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

    const name = createTextElement(
      "p",
      getDayName(day.datetime),
      null,
      "forecast-day-name",
    );

    const icon = createTextDiv("🌤️", null, "forecast-day-icon");

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

    dayEl.append(name, icon, temp, precip);
    strip.append(dayEl);
  });
}

function renderDetails(day, city, settings) {
  document.querySelector(".detail-city").textContent = city;
  document.querySelector(".detail-date").textContent = formatHeaderDate(
    day.datetime,
  );

  const rows = [
    {
      label: "Temperature",
      value: formatTemperature(day.temp, settings.tempUnit),
    },
    {
      label: "Feels like",
      value: formatTemperature(day.feelslike, settings.tempUnit),
    },
    {
      label: "Feels like min",
      value: formatTemperature(day.feelslikemin, settings.tempUnit),
    },
    {
      label: "Feels like max",
      value: formatTemperature(day.feelslikemax, settings.tempUnit),
    },
    {
      label: "Humidity",
      value: `${day.humidity}%`,
    },
    {
      label: "Wind",
      value: formatWindSpeed(day.windspeed, settings.windspeedUnit),
    },
    {
      label: "Pressure",
      value: formatPressure(day.pressure, settings.pressureUnit),
    },
    {
      label: "Sunrise",
      value: formatTime(day.sunrise, settings.timeFormat),
    },
    {
      label: "Sunset",
      value: formatTime(day.sunset, settings.timeFormat),
    },
    {
      label: "Rain chance",
      value: `${day.precipprob ?? 0}%`,
    },
    {
      label: "Description",
      value: day.description,
    },
  ];

  const detailRows = document.querySelector(".detail-rows");
  detailRows.textContent = "";

  rows.forEach(({ label, value }) => {
    const row = createDiv(null, "detail-row");
    const labelEl = createTextElement("p", label, null, "detail-label");
    const valueEl = createTextElement("p", value, null, "detail-value");
    row.append(labelEl, valueEl);
    detailRows.append(row);
  });
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

function renderHourlyForecast(hours = [], settings, shouldAutoScroll = false) {
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

    const icon = createTextDiv("🌤️", null, "hourly-icon");

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

  if (shouldAutoScroll) {
    scrollHourlyStripToCurrentTime(strip, filteredHours);
  } else {
    strip.scrollLeft = 0;
  }
}

function scrollHourlyStripToCurrentTime(strip, hours) {
  const currentHour = new Date().getHours();
  const snappedHour = currentHour - (currentHour % 2);

  const foundIndex = hours.findIndex(
    (hour) => Number(hour.datetime.split(":")[0]) === snappedHour,
  );

  const targetIndex = Math.max(0, foundIndex - 4);

  const items = strip.querySelectorAll(".hourly-forecast-item");
  const targetItem = items[targetIndex];

  if (!targetItem) return;

  strip.scrollLeft = targetItem.offsetLeft;
  console.log({
    currentHour,
    snappedHour,
    renderedHours: hours.map((h) => h.datetime),
    foundIndex,
    targetIndex,
  });
}
