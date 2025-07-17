// src/utils/analytics.js
import ReactGA from 'react-ga4';

export const initGA = () => {
  if (process.env.NODE_ENV === 'production') {
    ReactGA.initialize('G-9L89SH2KYK'); // Replace with your Measurement ID
  }
};

export const logPageView = () => {
  if (process.env.NODE_ENV === 'production') {
    ReactGA.send({ hitType: 'pageview', page: window.location.pathname });
  }
};

export const logEvent = (category, action, label, value) => {
  if (process.env.NODE_ENV === 'production') {
    ReactGA.event({
      category,
      action,
      label,
      ...(value && { value }) // Only include value if provided
    });
  }
};

export const logError = (description, fatal = false) => {
  if (process.env.NODE_ENV === 'production') {
    ReactGA.event('exception', {
      description,
      fatal
    });
  }
};

// Specific function for menu tracking
export const trackMenuClick = (menuItem) => {
  logEvent('Navigation', 'Menu Click', menuItem);
};

// Specific function for logout tracking
export const trackLogout = () => {
  logEvent('Authentication', 'User Logout', 'Side Menu');
};