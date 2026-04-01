import {
  createDiv,
  createTextElement,
  createTextDiv,
  createInput,
} from "../utils/domHelpers";

export function renderWeather(weatherData) {
  document.querySelector(".header-city").textContent = weatherData.city;
  document.querySelector(".weather-condition").textContent =
    weatherData.conditions;
  document.querySelector(".weather-temp").textContent = `${weatherData.temp}°`;

  const strip = document.querySelector(".forecast-strip");
  weatherData.forecast.forEach((day) => {
    const dayEl = createDiv(null, "forecast-day");
    const name = createTextElement(
      "p",
      getDayName(day.date),
      null,
      "forecast-day-name",
    );
    const icon = createTextDiv("🌤️", null, "forecast-day-icon");
    const temp = createTextElement(
      "p",
      `${day.tempMax}°`,
      null,
      "forecast-day-temp",
    );
    dayEl.append(name, icon, temp);
    strip.append(dayEl);
  });

  document.querySelector(".detail-city").textContent = weatherData.city;

  const rows = [
    { label: "Conditions", value: weatherData.conditions },
    { label: "Humidity", value: `${weatherData.humidity}%` },
    { label: "Wind", value: `${weatherData.windSpeed} m/s` },
    { label: "Dew Point", value: `${weatherData.dew}°` },
    { label: "Sunrise", value: weatherData.sunrise },
    { label: "Sunset", value: weatherData.sunset },
  ];

  const detailRows = document.querySelector(".detail-rows");
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
