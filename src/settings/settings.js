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

export function formatTime(dateInput, format) {
  const date = dateInput instanceof Date ? dateInput : new Date(dateInput);

  if (format === "12h") {
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  }

  return date.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}

export function applyTheme(theme) {
  const root = document.documentElement;

  if (theme === "Light") {
    root.dataset.theme = "light";
  } else {
    root.dataset.theme = "dark";
  }
}
