export function renderWeather(weather) {
  const container = document.getElementById("weather");
  container.textContent = `${weather.city} ${weather.temp} ${weather.conditions}`;
}
