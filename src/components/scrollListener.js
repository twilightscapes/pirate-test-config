document.addEventListener('DOMContentLoaded', () => {
  const horizontalScrollClassName = 'horizontal-slider';
  const scrollMultiplier = 2; // Increase this value for faster scrolling

  document.addEventListener('wheel', (event) => {
    console.log('Wheel event detected'); // Log when the wheel event is detected
    let target = event.target;
    while (target && !target.classList.contains(horizontalScrollClassName)) {
      target = target.parentElement;
    }

    if (target && target.classList.contains(horizontalScrollClassName)) {
      console.log('Horizontal scroll area detected'); // Log when the horizontal scroll area is detected
      event.preventDefault();

      const scrollAmount = event.deltaY * scrollMultiplier;
      target.scrollLeft += scrollAmount;
    } else {
      console.log('No horizontal scroll area detected'); // Log when no horizontal scroll area is detected
    }
  }, { passive: false });
});