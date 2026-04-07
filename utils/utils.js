export function normalizeString(str) {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

export function searchCities(query, cities) {
  if (!query) return cities;
  const normalized = normalizeString(query);
  return cities.filter((city) => normalizeString(city).includes(normalized));
}

export function formatHour(timeString, timeFormat) {
  const [hours, minutes] = timeString.split(":");

  const date = new Date();
  date.setHours(Number(hours), Number(minutes), 0, 0);

  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: timeFormat === "12h",
  });
}
