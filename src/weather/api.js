const API_KEY = "KUP9JHYM5KSKHTEVC3M2HS87T";

const BASE_URL =
  "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline";

function normalizeWeatherData(data) {
  return {
    city: data.resolvedAddress,

    current: {
      temp: data.currentConditions.temp,
      feelslike: data.currentConditions.feelslike,
      humidity: data.currentConditions.humidity,
      windspeed: data.currentConditions.windspeed,
      conditions: data.currentConditions.conditions,
      icon: data.currentConditions.icon,
    },

    details: data.days.map((day) => ({
      datetime: day.datetime,
      icon: day.icon,
      description: day.description,
      temp: day.temp,
      tempmax: day.tempmax,
      tempmin: day.tempmin,
      feelslike: day.feelslike,
      feelslikemax: day.feelslikemax,
      feelslikemin: day.feelslikemin,
      humidity: day.humidity,
      windspeed: day.windspeed,
      pressure: day.pressure,
      sunrise: day.sunrise,
      sunset: day.sunset,
      precipprob: day.precipprob,
    })),

    forecast: data.days.slice(1, 15).map((day) => ({
      datetime: day.datetime,
      icon: day.icon,
      tempmax: day.tempmax,
      tempmin: day.tempmin,
      precipprob: day.precipprob,
    })),
  };
}

export async function getWeather(city) {
  const url = `${BASE_URL}/${encodeURIComponent(city)}?unitGroup=metric&key=${API_KEY}&contentType=json`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Weather request failed: ${response.status}`);
  }

  const data = await response.json();
  return normalizeWeatherData(data);
}
