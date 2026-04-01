export async function getWeather() {
  const response = await fetch(
    "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/cegléd?unitGroup=us&key=KUP9JHYM5KSKHTEVC3M2HS87T",
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
  };

  console.log(data);

  return weatherInfo;
}
