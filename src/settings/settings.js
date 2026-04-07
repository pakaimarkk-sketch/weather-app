export const defaultSettings = {
  tempUnit: "°C",
  windspeedUnit: "km/h",
  pressureUnit: "hPa",
  timeFormat: "24h",
  appearance: "Dark",
};

export function formatTemperature(value, unit) {
  switch (unit) {
    case "°F":
      return `${((value * 9) / 5 + 32).toFixed(1)}°F`;
    case "°C":
    default:
      return `${value}°C`;
  }
}

export function formatWindSpeed(value, unit) {
  switch (unit) {
    case "m/s":
      return `${(value / 3.6).toFixed(1)} m/s`;
    case "mph":
      return `${(value / 1.609).toFixed(1)} mph`;
    case "km/h":
    default:
      return `${value} km/h`;
  }
}

export function formatPressure(value, unit) {
  switch (unit) {
    case "mb":
      return `${value} mb`;
    case "mm":
      return `${(value * 0.750062).toFixed(0)} mmHg`;
    case "hPa":
    default:
      return `${value} hPa`;
  }
}

export function formatTime(timeString, format = "24h") {
  const trimmed = timeString.slice(0, 5);
  const [hoursStr, minutes] = trimmed.split(":");
  const hours = Number(hoursStr);

  if (format === "12h") {
    const suffix = hours >= 12 ? "PM" : "AM";
    const hour12 = hours % 12 || 12;
    return `${hour12}:${minutes} ${suffix}`;
  }

  return trimmed;
}

export function applyTheme(theme) {
  const root = document.documentElement;

  if (theme === "Light") {
    root.dataset.theme = "light";
  } else {
    root.dataset.theme = "dark";
  }
}
