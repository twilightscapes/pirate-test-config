document.addEventListener('DOMContentLoaded', () => {
  const horizontalScrollClassName = 'horizontal-slider';
  const scrollMultiplier = 2; // Increase this value for faster scrolling

  document.addEventListener('wheel', (event) => {
    let target = event.target;
    while (target && !target.classList.contains(horizontalScrollClassName)) {
      target = target.parentElement;
    }

    if (target && target.classList.contains(horizontalScrollClassName)) {
      event.preventDefault();

      const scrollAmount = event.deltaY * scrollMultiplier;
      target.scrollLeft += scrollAmount;
    }
  }, { passive: false });
});