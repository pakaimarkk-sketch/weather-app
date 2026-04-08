export function initSwipe(track, dots = [], options = {}) {
  const { initialPanel = 0, onPanelChange = () => {} } = options;

  let currentPanel = initialPanel;

  let startX = 0;
  let startY = 0;
  let dragX = 0;

  let isPointerDown = false;
  let isDragging = false;
  let lockedAxis = null;

  const PANEL_COUNT = 2;
  const DRAG_THRESHOLD = 10;
  const SWIPE_THRESHOLD_RATIO = 0.2;
  const MAX_EDGE_RESISTANCE = 60;

  function getPanelWidth() {
    return track.parentElement.offsetWidth;
  }

  function getBaseX(panelIndex = currentPanel) {
    return -panelIndex * getPanelWidth();
  }

  function updateDots(index) {
    dots.forEach((dot, i) => dot.classList.toggle("active", i === index));
  }

  function setTranslateX(x) {
    track.style.transform = `translate3d(${x}px, 0, 0)`;
  }

  function applyEdgeResistance(nextX, baseX) {
    const minX = -((PANEL_COUNT - 1) * getPanelWidth());
    const maxX = 0;

    if (nextX > maxX) {
      const overflow = nextX - maxX;
      return maxX + Math.min(overflow * 0.35, MAX_EDGE_RESISTANCE);
    }

    if (nextX < minX) {
      const overflow = minX - nextX;
      return minX - Math.min(overflow * 0.35, MAX_EDGE_RESISTANCE);
    }

    return nextX;
  }

  function snapTo(panelIndex) {
    currentPanel = Math.max(0, Math.min(panelIndex, PANEL_COUNT - 1));
    track.style.transition =
      "transform 0.32s cubic-bezier(0.22, 0.61, 0.36, 1)";
    setTranslateX(getBaseX(currentPanel));
    updateDots(currentPanel);
    onPanelChange(currentPanel);
  }

  function resetGesture() {
    isPointerDown = false;
    isDragging = false;
    lockedAxis = null;
    dragX = 0;
  }

  track.addEventListener("pointerdown", (e) => {
    isPointerDown = true;
    isDragging = false;
    lockedAxis = null;

    startX = e.clientX;
    startY = e.clientY;
    dragX = 0;

    track.style.transition = "none";
  });

  track.addEventListener(
    "pointermove",
    (e) => {
      if (!isPointerDown) return;

      const deltaX = e.clientX - startX;
      const deltaY = e.clientY - startY;

      if (!lockedAxis) {
        if (
          Math.abs(deltaX) < DRAG_THRESHOLD &&
          Math.abs(deltaY) < DRAG_THRESHOLD
        ) {
          return;
        }

        lockedAxis = Math.abs(deltaX) > Math.abs(deltaY) ? "x" : "y";

        if (lockedAxis === "x") {
          isDragging = true;
          track.setPointerCapture(e.pointerId);
          e.preventDefault();
        } else {
          resetGesture();
          return;
        }
      }

      if (!isDragging) return;

      dragX = deltaX;

      const baseX = getBaseX(currentPanel);
      const nextX = baseX + dragX;
      const resistedX = applyEdgeResistance(nextX, baseX);

      setTranslateX(resistedX);
    },
    { passive: false },
  );

  track.addEventListener("pointerup", (e) => {
    if (!isPointerDown) return;

    if (isDragging && track.hasPointerCapture(e.pointerId)) {
      track.releasePointerCapture(e.pointerId);
    }

    if (!isDragging) {
      resetGesture();
      return;
    }

    const panelWidth = getPanelWidth();
    const swipeThreshold = panelWidth * SWIPE_THRESHOLD_RATIO;

    if (dragX < -swipeThreshold && currentPanel < PANEL_COUNT - 1) {
      snapTo(currentPanel + 1);
    } else if (dragX > swipeThreshold && currentPanel > 0) {
      snapTo(currentPanel - 1);
    } else {
      snapTo(currentPanel);
    }

    resetGesture();
  });

  track.addEventListener("pointercancel", (e) => {
    if (isDragging && track.hasPointerCapture(e.pointerId)) {
      track.releasePointerCapture(e.pointerId);
    }

    snapTo(currentPanel);
    resetGesture();
  });

  window.addEventListener("resize", () => {
    track.style.transition = "none";
    setTranslateX(getBaseX(currentPanel));
  });

  snapTo(initialPanel);

  return {
    goTo(panelIndex) {
      snapTo(panelIndex);
    },
    next() {
      if (currentPanel < PANEL_COUNT - 1) {
        snapTo(currentPanel + 1);
      }
    },
    prev() {
      if (currentPanel > 0) {
        snapTo(currentPanel - 1);
      }
    },
    getCurrentPanel() {
      return currentPanel;
    },
  };
}
