export function initSwipe(track, panelWidth, dots = []) {
  let currentPanel = 0;
  let startX = 0;
  let dragX = 0;
  let isDragging = false;

  function getBaseX() {
    return -currentPanel * panelWidth;
  }

  function updateDots(index) {
    dots.forEach((dot, i) => dot.classList.toggle("active", i === index));
  }

  function snapTo(panelIndex) {
    currentPanel = panelIndex;
    track.style.transition =
      "transform 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94)";
    track.style.transform = `translateX(${getBaseX()}px)`;
    updateDots(currentPanel);
  }

  track.addEventListener("pointerdown", (e) => {
    isDragging = true;
    startX = e.clientX;
    dragX = 0;
    track.style.transition = "none";
    track.setPointerCapture(e.pointerId);
  });

  track.addEventListener("pointermove", (e) => {
    if (!isDragging) return;
    dragX = e.clientX - startX;
    track.style.transform = `translateX(${getBaseX() + dragX}px)`;
  });

  track.addEventListener("pointerup", () => {
    if (!isDragging) return;
    isDragging = false;

    if (dragX < -(panelWidth * 0.25) && currentPanel === 0) {
      snapTo(1);
    } else if (dragX > panelWidth * 0.25 && currentPanel === 1) {
      snapTo(0);
    } else {
      snapTo(currentPanel);
    }
  });

  track.addEventListener("pointercancel", () => {
    if (!isDragging) return;
    isDragging = false;
    snapTo(currentPanel);
  });
}
