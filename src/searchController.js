import cities from "./cities.json";
import { searchCities, normalizeString } from "../utils/utils";
import { selectCity } from "./appController";

let debounceTimer = null;

async function handleGeolocation() {
  if (!navigator.geolocation) return;

  navigator.geolocation.getCurrentPosition(
    async (position) => {
      try {
        const { latitude, longitude } = position.coords;

        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`,
        );

        if (!response.ok) {
          throw new Error("Failed to fetch location data.");
        }

        const data = await response.json();
        const city =
          data.address?.city || data.address?.town || data.address?.village;

        if (!city) {
          throw new Error("Could not determine city from location.");
        }

        selectCity(city);
      } catch (error) {
        console.error(error);
      }
    },
    (error) => {
      console.error("Geolocation error:", error);
    },
  );
}

export function initSearch() {
  const input = document.getElementById("search-input");
  const locationBtn = document.querySelector(".search-location-btn");

  if (!input || !locationBtn) return;

  renderCityList(cities);

  input.addEventListener("input", (e) => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      const query = e.target.value;
      const filtered = searchCities(query, cities);
      renderCityList(filtered, query);
    }, 150);
  });

  locationBtn.addEventListener("click", handleGeolocation);
}

function renderCityList(filtered, query = "") {
  const list = document.getElementById("search-city-list");
  list.textContent = "";

  filtered.forEach((city) => {
    const item = document.createElement("li");
    item.classList.add("search-city-item");

    if (query) {
      const normalized = normalizeString(city);
      const normalizedQuery = normalizeString(query);
      const index = normalized.indexOf(normalizedQuery);

      if (index !== -1) {
        const before = city.slice(0, index);
        const match = city.slice(index, index + query.length);
        const after = city.slice(index + query.length);
        item.innerHTML = `${before}<mark>${match}</mark>${after}`;
      } else {
        item.textContent = city;
      }
    } else {
      item.textContent = city;
    }

    item.addEventListener("click", () => selectCity(city));
    list.append(item);
  });
}
