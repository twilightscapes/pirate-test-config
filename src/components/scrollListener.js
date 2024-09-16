document.addEventListener('DOMContentLoaded', () => {
  const horizontalScrollClassName = 'horizontal-slider';
  const scrollMultiplier = 2;

  // Check if the browser is Safari
  const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

  document.addEventListener('wheel', (event) => {
    let target = event.target;
    while (target && !target.classList.contains(horizontalScrollClassName)) {
      target = target.parentElement;
    }

    if (target && target.classList.contains(horizontalScrollClassName)) {
      event.preventDefault();

      let scrollAmount;
      if (isSafari) {
        // For Safari, use deltaX for horizontal scrolling
        scrollAmount = event.deltaX * scrollMultiplier;
      } else {
        // For other browsers, use deltaY as before
        scrollAmount = event.deltaY * scrollMultiplier;
      }

      target.scrollLeft += scrollAmount;
    }
  }, { passive: false });
});