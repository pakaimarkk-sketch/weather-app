import clearDay from "../assets/icons/clear-day.svg";
import clearNight from "../assets/icons/clear-night.svg";
import partlyCloudyDay from "../assets/icons/partly-cloudy-day.svg";
import partlyCloudyNight from "../assets/icons/partly-cloudy-night.svg";
import cloudy from "../assets/icons/cloudy.svg";
import fog from "../assets/icons/fog.svg";
import wind from "../assets/icons/wind.svg";
import rain from "../assets/icons/rain.svg";
import showersDay from "../assets/icons/showers-day.svg";
import showersNight from "../assets/icons/showers-night.svg";
import thunderRain from "../assets/icons/thunderstorms-rain.svg";
import thunder from "../assets/icons/thunderstorms.svg";
import snow from "../assets/icons/snow.svg";
import snowShowersDay from "../assets/icons/snow-showers-day.svg";
import snowShowersNight from "../assets/icons/snow-showers-night.svg";
import sleet from "../assets/icons/sleet.svg";
import hail from "../assets/icons/hail.svg";

const iconMap = {
  "clear-day": clearDay,
  "clear-night": clearNight,
  "partly-cloudy-day": partlyCloudyDay,
  "partly-cloudy-night": partlyCloudyNight,
  cloudy: cloudy,
  fog: fog,
  wind: wind,
  rain: rain,
  "showers-day": showersDay,
  "showers-night": showersNight,
  "thunder-rain": thunderRain,
  thunderstorms: thunder,
  snow: snow,
  "snow-showers-day": snowShowersDay,
  "snow-showers-night": snowShowersNight,
  sleet: sleet,
  hail: hail,
};

export function getWeatherIcon(iconName) {
  return iconMap[iconName] || cloudy;
}
