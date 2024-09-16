if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    const horizontalScrollClassName = 'horizontal-slider';
    const scrollMultiplier = 2;

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
          scrollAmount = event.deltaX * scrollMultiplier;
        } else {
          scrollAmount = event.deltaY * scrollMultiplier;
        }

        target.scrollLeft += scrollAmount;
      }
    }, { passive: false });
  });
}
