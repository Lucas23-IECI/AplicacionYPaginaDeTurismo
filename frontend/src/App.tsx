import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import { LocationProvider } from './lib/location';
import { DarkModeProvider } from './lib/darkMode';
import ErrorBoundary from './components/ui/ErrorBoundary';

export default function App() {
  return (
    <ErrorBoundary>
      <DarkModeProvider>
        <LocationProvider>
          <RouterProvider router={router} />
        </LocationProvider>
      </DarkModeProvider>
    </ErrorBoundary>
  );
}
