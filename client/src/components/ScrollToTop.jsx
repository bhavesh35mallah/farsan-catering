import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * ScrollToTop ensures that whenever the user navigates to a new page or route,
 * the window and main scrollable containers are immediately reset to top: 0, left: 0.
 */
const ScrollToTop = () => {
  const { pathname, search, hash } = useLocation();

  useEffect(() => {
    // If user clicked an anchor hash link on the current page, scroll to that element
    if (hash) {
      const element = document.querySelector(hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }

    // Otherwise, immediately reset page scroll position to top
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant'
    });

    if (document.documentElement) {
      document.documentElement.scrollTop = 0;
    }
    if (document.body) {
      document.body.scrollTop = 0;
    }

    // Also reset any scrollable main elements (e.g. Admin layout or modal containers)
    const mainContainers = document.querySelectorAll('main, [data-scrollable]');
    mainContainers.forEach((container) => {
      container.scrollTop = 0;
    });
  }, [pathname, search, hash]);

  return null;
};

export default ScrollToTop;
