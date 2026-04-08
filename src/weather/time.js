let clockTimeout = null;
let clockInterval = null;

function getCurrentTime(timeZone) {
  return new Date().toLocaleTimeString("en-GB", {
    timeZone,
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function startClock(timeZone) {
  const clockEl = document.querySelector(".overview-clock");
  if (!clockEl) return;

  clearTimeout(clockTimeout);
  clearInterval(clockInterval);

  function updateClock() {
    clockEl.textContent = getCurrentTime(timeZone);
  }

  updateClock();

  const now = new Date();
  const secondsUntilNextMinute = 60 - now.getSeconds();
  const msUntilNextMinute =
    secondsUntilNextMinute * 1000 - now.getMilliseconds();

  clockTimeout = setTimeout(() => {
    updateClock();
    clockInterval = setInterval(updateClock, 60000);
  }, msUntilNextMinute);
}
