import AppProvider from './providers/AppProvider';
import AppRouter from './routes';
import { useEffect } from 'react';
import { initGA } from './utils/analytics'; // Only import initGA

export default function App() {
  useEffect(() => {
    initGA(); // Initialize GA once when app loads
  }, []);

  return (
    <AppProvider>
      <AppRouter />
    </AppProvider>
  );
}