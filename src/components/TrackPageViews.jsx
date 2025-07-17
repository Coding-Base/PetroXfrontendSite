import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { logPageView } from '../utils/analytics';

export default function TrackPageViews() {
  const location = useLocation();

  useEffect(() => {
    logPageView();
  }, [location]);

  return null; // This component doesn't render anything
}