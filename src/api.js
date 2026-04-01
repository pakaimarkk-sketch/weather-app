export async function getWeather(city) {
  const response = await fetch(
    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=metric&key=KUP9JHYM5KSKHTEVC3M2HS87T`,
  );
  const data = await response.json();

  const weatherInfo = {
    city: data.resolvedAddress,
    temp: data.currentConditions.temp,
    feelsLike: data.currentConditions.feelslike,
    conditions: data.currentConditions.conditions,
    icon: data.currentConditions.icon,
    humidity: data.currentConditions.humidity,
    windSpeed: data.currentConditions.windspeed,
    sunrise: data.currentConditions.sunrise,
    sunset: data.currentConditions.sunset,
    dew: data.currentConditions.dew,

    forecast: data.days.slice(1, 7).map((day) => ({
      date: day.datetime,
      icon: day.icon,
      tempMax: day.tempmax,
      tempMin: day.tempmin,
    })),
  };

  return weatherInfo;
}
