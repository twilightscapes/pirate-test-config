document.addEventListener('DOMContentLoaded', () => {
  const horizontalScrollClassName = 'horizontal-slider';
  const scrollMultiplier = 2;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = entry.target;
        
        const handleWheel = (event) => {
          event.preventDefault();
          const scrollAmount = (event.deltaX || event.deltaY) * scrollMultiplier;
          target.scrollLeft += scrollAmount;
        };

        target.addEventListener('wheel', handleWheel, { passive: false });

        // Touch events for mobile
        let touchStartX;
        target.addEventListener('touchstart', (event) => {
          touchStartX = event.touches[0].clientX;
        }, { passive: true });

        target.addEventListener('touchmove', (event) => {
          if (!touchStartX) return;
          const touchEndX = event.touches[0].clientX;
          const diff = touchStartX - touchEndX;
          target.scrollLeft += diff;
          touchStartX = touchEndX;
        }, { passive: true });
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll(`.${horizontalScrollClassName}`).forEach(el => {
    observer.observe(el);
  });
});