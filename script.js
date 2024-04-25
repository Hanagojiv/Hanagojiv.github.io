// Wrap everything in an IIFE to avoid polluting global scope
(function() {
    // Initialize AOS for scroll animations
    AOS.init({
      duration: 1200,
      once: true,
    });
  
    // Debounce function to limit the rate at which a function can fire.
    function debounce(func, wait = 20, immediate = true) {
      var timeout;
      return function() {
        var context = this, args = arguments;
        var later = function() {
          timeout = null;
          if (!immediate) func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
      };
    }
  
    // Function to check if element is in viewport
    function isInViewport(element) {
      const rect = element.getBoundingClientRect();
      return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
      );
    }
  
    // Function to animate elements on scroll
    function checkSlide() {
      document.querySelectorAll('.slide-in').forEach(slider => {
        // Halfway through the element
        const slideInAt = (window.scrollY + window.innerHeight) - slider.offsetHeight / 2;
        // Bottom of the element
        const elementBottom = slider.offsetTop + slider.offsetHeight;
        const isHalfShown = slideInAt > slider.offsetTop;
        const isNotScrolledPast = window.scrollY < elementBottom;
        if (isHalfShown && isNotScrolledPast) {
          slider.classList.add('active');
        } else {
          slider.classList.remove('active');
        }
      });
    }
  
    // Run the checkSlide function on scroll, debounced for performance
    window.addEventListener('scroll', debounce(checkSlide));
  
    // Smooth scrolling for anchor links across the site
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        let target = document.querySelector(this.getAttribute('href'));
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      });
    });
  
    // Load event for animations that should only play once the page is fully loaded
    window.addEventListener('load', () => {
      // Add any load-specific animations or triggers here
      document.body.classList.add('page-loaded');
    });
  
    // Optional: Add listener for window resize or orientation change if needed for adjusting animations or layouts
    window.addEventListener('resize', debounce(() => {
      // Code to run on window resize, debounced for performance
    }));
  
  })();
  